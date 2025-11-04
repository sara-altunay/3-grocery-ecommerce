"use client";

import { addToBasket } from "@/service/basket-service";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  groceryId: string;
}

const CardAction: FC<Props> = ({ groceryId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleBasket = async () => {
    setLoading(true);

    // Aktif kullanıcıyı runtime'da garanti altına al
    if (typeof window !== "undefined") {
      const defaultUid = process.env.NEXT_PUBLIC_USER_ID || "guest";
      const uid = localStorage.getItem("userId") || defaultUid;
      localStorage.setItem("userId", uid);
      document.cookie = `userId=${uid}; path=/`;
    }

    addToBasket(groceryId, 1)
      .then(() => {
        toast.success("Item added to cart");
        router.refresh();
        // client badge update
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cart:updated"));
        }
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <button
      onClick={handleBasket}
      className="bg-green-500 text-white shadow-md rounded-full p-2 cursor-pointer transition-all hover:bg-green-600 hover:shadow-md disabled:brightness-75"
    >
      {loading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
    </button>
  );
};

export default CardAction;
