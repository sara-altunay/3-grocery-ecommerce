import { Cart } from "@/types";
import Link from "next/link";
import { FC } from "react";
import CheckoutBtn from "./checkout-btn";

interface Props {
  cart: Cart;
}

const CartSummary: FC<Props> = ({ cart }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-6 sticky top-4">
      <h2 className="font-semibold">Order Summary</h2>

      <div className="space-y-3 mt-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold">{cart.totalAmount} TRY</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold">Free</span>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-gray-600">
            <span>Total</span>
            <span className="font-semibold text-lg text-green-600">
              {cart.totalAmount} TRY
            </span>
          </div>
        </div>
      </div>

      <CheckoutBtn />

      <Link
        href="/"
        className="block text-center mt-4 text-green-600 hover:underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
