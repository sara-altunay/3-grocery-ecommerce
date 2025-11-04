"use client";

import { addToBasket, checkoutSingleItem } from "@/service/basket-service";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  grocery: Product;
}

const OrderButtons: FC<Props> = ({ grocery }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToBasket = async () => {
    if (quantity < 1 || quantity > grocery.stock) return;
    setIsLoading(true);

    addToBasket(grocery._id, quantity)
      .then(() => {
        // reset miktarı 1'e çekelim
        setQuantity(1);
        router.refresh();
        // client badge'i tetikle
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cart:updated"));
        }
        toast.success(
          `${quantity} ${grocery.unit} ${grocery.name} added to cart`
        );
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBuyNow = async () => {
    if (quantity < 1 || quantity > grocery.stock) return;
    setIsLoading(true);

    checkoutSingleItem(grocery, quantity)
      .then((data) => {
        setQuantity(0);
        window.location.href = data.url;
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      {/* Miktar Seçimi */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            disabled={quantity === 1 || isLoading}
            onClick={() => setQuantity(quantity - 1)}
            className="counter-button"
          >
            <FaMinus />
          </button>

          <span className="px-3 py-2 border-x border-gray-300 min-w-[40px] text-center">
            {quantity}
          </span>

          <button
            disabled={quantity === grocery.stock || isLoading}
            onClick={() => setQuantity(quantity + 1)}
            className="counter-button"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex items-center gap-3 mt-4">
        <button
          disabled={isLoading}
          onClick={handleAddToBasket}
          className="order-button"
        >
          <FaShoppingCart />
          Add to Cart
        </button>

        <button
          disabled={isLoading}
          onClick={handleBuyNow}
          className="order-button bg-green-600 text-white hover:bg-green-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default OrderButtons;
