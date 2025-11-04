import Link from "next/link";
import { FC } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import SearchForm from "@/components/header/search-form";
import CartBadge from "@/components/header/cart-badge";
import UserSwitcher from "@/components/header/user-switcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Header: FC = () => {

  return (
    <div className="sticky top-0 z-10 bg-white flex justify-between items-center py-5 px-7 lg:py-6 lg:px-10 shadow-sm">
      <Link
        href="/"
        className="text-green-600 font-bold text-2xl lg:text-3xl flex items-center gap-2"
      >
        <MdOutlineLocalGroceryStore />
        <span>GROCERY</span>
      </Link>

      <SearchForm />

      <div className="flex items-center gap-5">
        <UserSwitcher />
        <Link
          href="/orders"
          className="text-lg relative text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <RiFileList3Line className="text-2xl" />
          <span className="max-md:hidden">My Orders</span>
        </Link>

        <Link
          href="/cart"
          className="text-lg relative text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <div className="relative">
            <FaShoppingCart className="text-2xl" />
            <CartBadge />
          </div>
          <span className="max-md:hidden">My Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
