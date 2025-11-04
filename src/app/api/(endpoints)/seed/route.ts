import { NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await connectMongo();

    const sample = [
      {
        name: "Elma",
        category: "Meyve",
        price: 29.9,
        unit: "1 kg",
        stock: 100,
        origin: "Amasya",
        isOrganic: true,
        description: "Taze ve sulu Amasya elması",
        nutritionalValue: "C vitamini bakımından zengin",
        expiryDays: 7,
        photo: "/vercel.svg"
      },
      {
        name: "Muz",
        category: "Meyve",
        price: 39.9,
        unit: "1 kg",
        stock: 80,
        origin: "Mersin",
        isOrganic: false,
        description: "Tatlı ve yumuşak muz",
        nutritionalValue: "Potasyum kaynağı",
        expiryDays: 5,
        photo: "/vercel.svg"
      },
      {
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
        photo: "/vercel.svg"
      }
    ];

    // Avoid duplicates by checking existing count
    const count = await Grocery.countDocuments();
    if (count === 0) {
      await Grocery.insertMany(sample);
    }

    const groceries = await Grocery.find({}).limit(50);
    return NextResponse.json({ inserted: count === 0 ? sample.length : 0, total: groceries.length, groceries }, { status: 200 });
  } catch (err) {
    console.error("Seed error", err);
    return NextResponse.json({ message: "Seed işlemi başarısız" }, { status: 500 });
  }
}
