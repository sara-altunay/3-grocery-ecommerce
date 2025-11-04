import Link from "next/link";
import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-5 text-white">
      <div className="flex flex-col justify-between p-6 rounded-lg bg-gradient-to-r from-green-600 to-green-700 ">
        <h1 className="text-2xl font-semibold">
          Organic Products
          <br />
          At Great Prices
        </h1>

        <p className="my-3">
          Eating healthy with natural and organic products is now easier than ever.
        </p>

        <Link
          href="/organics"
          className="bg-white inline-block w-fit text-green-700 py-2 px-4 rounded-md hover:bg-green-50 transition cursor-pointer"
        >
          Organic Products
        </Link>
      </div>

      <div className="max-lg:hidden flex flex-col justify-between p-6 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 ">
        <h1 className="text-2xl font-semibold">
          Fresh Grocery Produce
          <br />
          Delivered To Your Door
        </h1>

        <p className="my-3">
          The freshest fruits and vegetables at your fingertips. Take the first step toward a healthy life.
        </p>

        <Link
          href="/"
          className="bg-white inline-block w-fit text-orange-700 py-2 px-4 rounded-md hover:bg-orange-50 transition cursor-pointer"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default Hero;
