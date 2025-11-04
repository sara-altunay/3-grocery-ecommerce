import EmptyOrder from "@/components/cart/empty-order";
import { getOrders } from "@/service/basket-service";
import Image from "next/image";
import { FC } from "react";
import { FaCalendarAlt, FaPhone } from "react-icons/fa";
import { cookies } from "next/headers";

const OrdersPage: FC = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || process.env.NEXT_PUBLIC_USER_ID;
  const { orders } = await getOrders(userId);

  if (!orders || orders.length === 0) {
    return <EmptyOrder />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-lg bg-white border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="p-6">
              {/* Ürün Bilgileri */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 mb-3 md:mb-0">
                  <div className="size-20 relative rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={(order.product?.photo as string) || "/file.svg"}
                      alt={order.product?.name || "Ürün"}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {order.product?.name || "Ürün (silinmiş)"}
                    </h3>

                    <p className="text-gray-600">
                      {order.quantity} {order.product?.unit || "adet"} x{" "}
                      {order.product?.price ?? 0} TL
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <h5 className="text-2xl font-bold text-green-600">
                    {order.money_spend}
                  </h5>
                  <p className="text-sm text-gray-500">{order.currency}</p>
                </div>
              </div>

              {/* Order Date */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-green-600" />

                  <div>
                    <h5 className="text-sm text-gray-500">Order Date</h5>
                    <p>{new Date(order.createdAt).toLocaleDateString("en-US")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-600" />

                  <div>
                    <h5 className="text-sm text-gray-500">Customer</h5>
                    <p>{order.customer_name}</p>
                    <p className="text-sm text-gray-700">
                      {order.customer_phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
