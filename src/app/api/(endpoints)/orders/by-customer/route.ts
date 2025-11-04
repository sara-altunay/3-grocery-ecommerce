import { NextResponse } from "next/server";
import connectMongo from "../../../utils/connectMongo";
import Order from "../../../models/Order";

export async function DELETE(req: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const customer_id = searchParams.get("customer_id");
    const customer_name = searchParams.get("customer_name");
    const onlyNullProduct = searchParams.get("only_null_product") === "true";

    if (!customer_id && !customer_name) {
      return NextResponse.json(
        { message: "customer_id veya customer_name zorunludur" },
        { status: 400 }
      );
    }

    const filter: Record<string, any> = {};
    if (customer_id) filter.customer_id = customer_id;
    if (customer_name) filter.customer_name = customer_name;
    if (onlyNullProduct) filter.product = null;

    const result = await Order.deleteMany(filter);

    return NextResponse.json({ deletedCount: result.deletedCount ?? 0 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Silme işlemi başarısız" }, { status: 500 });
  }
}
