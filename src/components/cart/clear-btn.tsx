"use client";

import { clearCart } from "@/service/basket-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ClearBtn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClear = async () => {
    setLoading(true);

    try {
      await clearCart();
      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClear}
      disabled={loading}
      className="hover:text-red-800 transition cursor-pointer disabled:cursor-not-allowed disabled:text-gray-500"
    >
      Clear
    </button>
  );
};

export default ClearBtn;
