import ProductDetails from "@/components/detail/product-details";
import ProductInfo from "@/components/detail/product-info";
import { getProductById } from "@/service/product-service";
import Link from "next/link";
import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const GroceryPage: FC<Props> = async ({ params }: Props) => {
  const { id } = await params;

  const { grocery } = await getProductById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-green-600 hover:underline"
        >
          <FaArrowLeft />
          Ana Sayfa Dön
        </Link>
      </div>

      <div>
        <ProductDetails grocery={grocery} />
        <ProductInfo grocery={grocery} />
      </div>
    </div>
  );
};

export default GroceryPage;
