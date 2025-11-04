import Link from "next/link";
import { FC } from "react";
import { IoCloseCircleOutline as CloseCircle } from "react-icons/io5";

const CancelPage: FC = async () => {
  return (
    <div className="h-[80vh]">
      <div className="h-[50%] bg-red-500 text-white grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <CloseCircle className="text-[70px]" />
          <p className="font-semibold text-3xl text-center">
            Payment Canceled
          </p>
        </div>
      </div>

      <div className="h-[50%] p-10 mt-5 text-center text-black">
        <p className="text-lg">The payment was canceled or failed.</p>
        <p className="mt-5 mb-10 text-zinc-700">
          You can check your cart and try again.
        </p>

        <Link
          href="/cart"
          className="border shadow py-2 px-5 rounded-lg hover:shadow-lg hover:bg-gray-100"
        >
          Back to Cart
        </Link>

        <Link
          href="/"
          className="block mt-10 w-fit mx-auto border shadow py-2 px-5 rounded-lg hover:shadow-lg hover:bg-gray-100"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
