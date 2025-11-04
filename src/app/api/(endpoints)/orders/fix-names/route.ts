import { NextResponse } from "next/server";
import connectMongo from "../../utils/connectMongo";
import Order from "../../models/Order";

function expectedNameFor(userId?: string | null) {
  if (!userId) return undefined;
  if (userId === "saraaltunay") return "Sara Altunay";
  if (userId === "furkanevin") return "Furkan Evin";
  return userId;
}

export async function POST() {
  try {
    await connectMongo();

    const orders = await Order.find({});
    let updated = 0;

    for (const o of orders) {
      const expected = expectedNameFor(o.customer_id);
      if (expected && o.customer_name !== expected) {
        o.customer_name = expected;
        await o.save();
        updated += 1;
      }
    }

    return NextResponse.json({ status: "ok", updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
