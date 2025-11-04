import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ItemActions from "./item-actions";

export interface ItemProps {
  item: {
    grocery: Product;
    name: string;
    price: number;
    quantity: number;
    _id: string;
  };
}

const CartItem: FC<ItemProps> = ({ item }) => {
  return (
    <li className="flex items-center p-4 gap-4">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={item.grocery.photo}
          alt={item.grocery.name}
          width={100}
          height={100}
          className="rounded-lg"
        />
      </div>

      <div className="flex-1">
        <Link href={`/grocery/${item.grocery._id}`}>
          <h3 className="text-lg font-semibold text-green-600 hover:text-green-700">
            {item.grocery.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm">{item.grocery.unit}</p>
        <p className="text-green-600 font-semibold">{item.price} TL</p>
      </div>

      <ItemActions item={item} />
    </li>
  );
};

export default CartItem;
