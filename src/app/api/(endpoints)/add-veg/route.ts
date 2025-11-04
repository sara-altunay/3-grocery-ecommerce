import { NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

export const dynamic = "force-dynamic";

// Insert a sample vegetable if none exists
export async function POST() {
  try {
    await connectMongo();

    const hasVeg = await Grocery.exists({ category: /sebze|vegetable/i });
    if (!hasVeg) {
      await Grocery.create({
        name: "Domates",
        category: "Sebze",
        price: 24.5,
        unit: "1 kg",
        stock: 120,
        origin: "Antalya",
        isOrganic: true,
        description: "Kokulu ve taze tarla domatesi",
        nutritionalValue: "Likopen içerir",
        expiryDays: 6,
        photo: "/images/tomato.svg",
      });
    }

    const groceries = await Grocery.find({}).limit(100);
    return NextResponse.json({ inserted: hasVeg ? 0 : 1, total: groceries.length, groceries }, { status: 200 });
  } catch (err) {
    console.error("add-veg error", err);
    return NextResponse.json({ message: "Sebze eklenemedi" }, { status: 500 });
  }
}
