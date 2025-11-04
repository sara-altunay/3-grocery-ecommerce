import { FC } from "react";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Products from "@/components/home/products";

interface Props {
  searchParams: Promise<{ query?: string; category?: string; organic?: string }>;
}

const Home: FC<Props> = async ({ searchParams }) => {
  const sp = await searchParams;
  const query = sp.query || undefined;
  const category = sp.category || undefined;
  const organic = sp.organic === "true" ? true : sp.organic === "false" ? false : undefined;
  return (
    <div className="p-5 md:p-7 lg:px-10">
      <Hero />
      <Features />
      <Products query={query} category={category} organic={organic} />
    </div>
  );
};

export default Home;
