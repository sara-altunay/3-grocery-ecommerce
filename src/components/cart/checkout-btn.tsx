"use client";

import { checkoutAllItems } from "@/service/basket-service";
import { FC, useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const CheckoutBtn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // sepetteki ürünleri satın alma sayfasının url'ini oluştur
      const res = await checkoutAllItems();
      // kullanıcyı satın alım sayfasına yönlendir
      window.location.href = res.url;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="flex items-center cursor-pointer justify-center gap-2 w-full bg-green-600 text-white px-4 h-10 rounded-md hover:bg-green-700 transition disabled:brightness-75 disabled:cursor-not-allowed"
    >
      <MdOutlineShoppingCartCheckout />
      Checkout
    </button>
  );
};

export default CheckoutBtn;
