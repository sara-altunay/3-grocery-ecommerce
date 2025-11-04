import { Product } from "@/types";
import { FC } from "react";

interface Props {
  grocery: Product;
}

const ProductInfo: FC<Props> = ({ grocery }) => {
  const info = [
    { title: "Category", value: grocery.category },
    { title: "Origin", value: grocery.origin },
    { title: "Freshness", value: `${grocery.expiryDays} days` },
    { title: "Organic", value: grocery.isOrganic ? "Yes" : "No" },
    { title: "Unit", value: grocery.unit },
    { title: "Stock", value: grocery.stock },
  ];

  return (
    <div className="p-6 border-t border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Product Information
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {info.map((item, key) => (
          <div key={key} className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm text-gray-500">{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
