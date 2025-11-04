import { NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await connectMongo();

    const result = await Grocery.updateMany(
      { photo: { $regex: "^/images/" } },
      { $set: { photo: "/vercel.svg" } }
    );

    const groceries = await Grocery.find({}).limit(50);
    return NextResponse.json({ modified: result.modifiedCount, groceries }, { status: 200 });
  } catch (err) {
    console.error("fix-photos error", err);
    return NextResponse.json({ message: "Fotoğraflar güncellenemedi" }, { status: 500 });
  }
}
