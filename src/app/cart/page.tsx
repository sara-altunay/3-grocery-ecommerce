import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import ClearBtn from "@/components/cart/clear-btn";
import EmptyCart from "@/components/cart/empty-cart";
import { getCart } from "@/service/basket-service";
import { cookies } from "next/headers";
import { FC } from "react";

const CartPage: FC = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || process.env.NEXT_PUBLIC_USER_ID;
  const { cart } = await getCart(userId);

  if (cart.items.length === 0) return <EmptyCart />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Shopping Cart
      </h1>

      <div className="lg:flex gap-6">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                Your Cart ({cart.items.length})
              </h2>

              <ClearBtn />
            </div>

            <ul>
              {cart.items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
