import { NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

export const dynamic = "force-dynamic";

// Bulk insert many fruits (Meyve) and vegetables (Sebze)
export async function POST() {
  try {
    await connectMongo();

    const items = [
      // Meyve
      { name: "Muz", category: "Meyve", price: 39.9, unit: "1 kg", stock: 80, origin: "Mersin", isOrganic: false, description: "Tatlı ve yumuşak muz", nutritionalValue: "Potasyum kaynağı", expiryDays: 5, photo: "/images/apples.svg" },
      { name: "Portakal", category: "Meyve", price: 34.9, unit: "1 kg", stock: 90, origin: "Antalya", isOrganic: true, description: "Sulu ve C vitamini deposu", nutritionalValue: "C vitamini bakımından zengin", expiryDays: 7, photo: "/images/apples.svg" },
      { name: "Çilek", category: "Meyve", price: 49.9, unit: "500 g", stock: 60, origin: "Aydın", isOrganic: true, description: "Kokulu taze çilek", nutritionalValue: "Antioksidan bakımından zengin", expiryDays: 3, photo: "/images/apples.svg" },
      { name: "Üzüm", category: "Meyve", price: 44.9, unit: "1 kg", stock: 70, origin: "Manisa", isOrganic: false, description: "Taze siyah üzüm", nutritionalValue: "Doğal şeker içerir", expiryDays: 5, photo: "/images/apples.svg" },
      { name: "Armut", category: "Meyve", price: 29.9, unit: "1 kg", stock: 65, origin: "Bursa", isOrganic: true, description: "Sulu ve tatlı armut", nutritionalValue: "Lif kaynağı", expiryDays: 6, photo: "/images/apples.svg" },
      // Sebze
      { name: "Biber", category: "Sebze", price: 19.9, unit: "1 kg", stock: 110, origin: "Antalya", isOrganic: true, description: "Taze yeşil biber", nutritionalValue: "C vitamini içerir", expiryDays: 6, photo: "/images/tomato.svg" },
      { name: "Salatalık", category: "Sebze", price: 17.5, unit: "1 kg", stock: 120, origin: "Muğla", isOrganic: true, description: "Serinletici taze salatalık", nutritionalValue: "Su oranı yüksek", expiryDays: 5, photo: "/images/tomato.svg" },
      { name: "Patlıcan", category: "Sebze", price: 22.9, unit: "1 kg", stock: 85, origin: "Mersin", isOrganic: false, description: "Közlemelik patlıcan", nutritionalValue: "Lif ve vitamin içerir", expiryDays: 5, photo: "/images/tomato.svg" },
      { name: "Soğan", category: "Sebze", price: 9.9, unit: "1 kg", stock: 200, origin: "Ankara", isOrganic: false, description: "Kuru soğan", nutritionalValue: "Antioksidan içerir", expiryDays: 20, photo: "/images/tomato.svg" },
      { name: "Patates", category: "Sebze", price: 14.9, unit: "1 kg", stock: 180, origin: "Niğde", isOrganic: false, description: "Yemeklik patates", nutritionalValue: "Karbonhidrat kaynağı", expiryDays: 25, photo: "/images/tomato.svg" },
    ];

    // Remove existing with same names to avoid duplicates on re-run
    const names = items.map((i) => i.name);
    await Grocery.deleteMany({ name: { $in: names } });

    const res = await Grocery.insertMany(items);

    const groceries = await Grocery.find({}).limit(200);
    return NextResponse.json({ inserted: res.length, total: groceries.length, groceries }, { status: 200 });
  } catch (err) {
    console.error("seed-more error", err);
    return NextResponse.json({ message: "Toplu ekleme başarısız" }, { status: 500 });
  }
}
