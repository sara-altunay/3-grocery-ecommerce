import { getAllProducts } from "@/service/product-service";
import { Product } from "@/types";
import { FC } from "react";
import Card from "./card";

interface Props {
  query?: string;
  category?: string;
  organic?: boolean;
}

const Products: FC<Props> = async ({ query, category, organic }) => {
  const { groceries } = await getAllProducts({ query, category, organic });

  // elimizdeki karşık veriyi category değerlerine göre grupla
  const groupedProducts = groceries.reduce<Record<string, Product[]>>(
    (obj, product) => {
      // ürünün kategorisini al
      const category = product.category;

      // nesnenin içerisinde ilgili kategorinin alanı yoksa oluştur
      if (!obj[category]) {
        obj[category] = [];
      }

      // nesnenin içerisinde ilgili kategorinin alanı varsa oraya ürünü ekle
      obj[category].push(product);

      // nesneyi döndür
      return obj;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-10">
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-5">{category}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
