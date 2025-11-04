import { NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await connectMongo();

    const updates = [
      { match: { name: /apples?/i }, set: { photo: "/images/apples.svg" } },
      { match: { name: /bread/i }, set: { photo: "/images/bread.svg" } },
      { match: { category: /meyve|fruits/i }, set: { photo: "/images/apples.svg" } },
      { match: { category: /bakery|fırın/i }, set: { photo: "/images/bread.svg" } },
    ];

    let modified = 0;
    for (const u of updates) {
      const res = await Grocery.updateMany(u.match, { $set: u.set });
      modified += res.modifiedCount;
    }

    const groceries = await Grocery.find({}).limit(50);
    return NextResponse.json({ modified, groceries }, { status: 200 });
  } catch (err) {
    console.error("update-photos error", err);
    return NextResponse.json({ message: "Fotoğraflar güncellenemedi" }, { status: 500 });
  }
}
