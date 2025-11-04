"use client";

import { FC, useState } from "react";
import { ItemProps } from "./cart-item";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { deleteCartItem, updateCartItem } from "@/service/basket-service";
import { useRouter } from "next/navigation";

const ItemActions: FC<ItemProps> = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ürünün miktarını arttır / azalt
  const handleQuantityChange = async (quantity: number) => {
    setLoading(true);

    try {
      await updateCartItem(item.grocery._id, quantity);
      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ürünü sepetten sil
  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteCartItem(item.grocery._id);
      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center border border-gray-300 rounded-md mr-4">
        <button
          disabled={loading}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="counter-button"
        >
          <FaMinus />
        </button>

        <span className="px-3 py-1 border-x border-gray-300 min-w-[36px] text-center">
          {item.quantity}
        </span>

        <button
          disabled={loading}
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="counter-button"
        >
          <FaPlus />
        </button>
      </div>

      <button
        disabled={loading}
        onClick={handleDelete}
        className="text-red-600 hover:text-red-700 cursor-pointer disabled:opacity-50"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default ItemActions;
