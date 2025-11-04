import { NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

export const dynamic = "force-dynamic";

// Map grocery names/categories to specific images in public/images
export async function POST() {
  try {
    await connectMongo();

    const rules: Array<{ match: any; set: any }> = [
      // Meyve
      { match: { name: /elma|apples?/i }, set: { photo: "/images/apples.svg" } },
      { match: { name: /muz|banana/i }, set: { photo: "/images/banana.svg" } },
      { match: { name: /portakal|orange/i }, set: { photo: "/images/orange.svg" } },
      { match: { name: /çilek|strawberry/i }, set: { photo: "/images/strawberry.svg" } },
      { match: { name: /üzüm|grape/i }, set: { photo: "/images/grape.svg" } },
      { match: { name: /armut|pear/i }, set: { photo: "/images/pear.svg" } },
      // Sebze
      { match: { name: /domates|tomato/i }, set: { photo: "/images/tomato.svg" } },
      { match: { name: /biber|pepper/i }, set: { photo: "/images/pepper.svg" } },
      { match: { name: /salatalık|cucumber/i }, set: { photo: "/images/cucumber.svg" } },
      { match: { name: /patlıcan|eggplant/i }, set: { photo: "/images/eggplant.svg" } },
      { match: { name: /soğan|onion/i }, set: { photo: "/images/onion.svg" } },
      { match: { name: /patates|potato/i }, set: { photo: "/images/potato.svg" } },
    ];

    let modified = 0;
    for (const r of rules) {
      const res = await Grocery.updateMany(r.match, { $set: r.set });
      modified += res.modifiedCount;
    }

    const groceries = await Grocery.find({}).limit(200);
    return NextResponse.json({ modified, total: groceries.length, groceries }, { status: 200 });
  } catch (err) {
    console.error("map-photos error", err);
    return NextResponse.json({ message: "Fotoğraf eşlemesi başarısız" }, { status: 500 });
  }
}
