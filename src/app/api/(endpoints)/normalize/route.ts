import { NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

export const dynamic = "force-dynamic";

// Normalize groceries:
// - Delete non Meyve/Sebze categories (e.g., Bakery)
// - Map category 'Fruits' -> 'Meyve', 'Vegetables'/'Sebze' -> 'Sebze'
// - Set photos by category: Meyve -> /images/apples.svg, Sebze -> /images/tomato.svg
export async function POST() {
  try {
    await connectMongo();

    // Delete items that are not Meyve or Sebze (case-insensitive), e.g., Bakery
    const delRes = await Grocery.deleteMany({
      category: { $nin: [/meyve/i, /sebze/i, /fruits?/i, /vegetables?/i] },
    });

    // Map categories to Turkish
    const mapOps = [
      { match: { category: /fruits?/i }, set: { category: "Meyve" } },
      { match: { category: /meyve/i }, set: { category: "Meyve" } },
      { match: { category: /vegetables?/i }, set: { category: "Sebze" } },
      { match: { category: /sebze/i }, set: { category: "Sebze" } },
    ];

    let modified = 0;
    for (const op of mapOps) {
      const res = await Grocery.updateMany(op.match, { $set: op.set });
      modified += res.modifiedCount;
    }

    // Set photos by final category
    const photoFruit = await Grocery.updateMany({ category: "Meyve" }, { $set: { photo: "/images/apples.svg" } });
    const photoVeg = await Grocery.updateMany({ category: "Sebze" }, { $set: { photo: "/images/tomato.svg" } });

    const groceries = await Grocery.find({}).limit(100);
    return NextResponse.json(
      {
        deleted: delRes.deletedCount,
        modified: modified + photoFruit.modifiedCount + photoVeg.modifiedCount,
        total: groceries.length,
        groceries,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("normalize error", err);
    return NextResponse.json({ message: "Normalize işlemi başarısız" }, { status: 500 });
  }
}
