import { GetAllProductsResponse, GetProductByIdResponse } from "@/types";

// api adresi
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ""; // relative path fallback

// tüm ürünleri getir (opsiyonel filtrelerle)
const getAllProducts = async (params?: { query?: string; category?: string; organic?: boolean }): GetAllProductsResponse => {
  const sp = new URLSearchParams();
  if (params?.query) sp.set("query", params.query);
  if (params?.category) sp.set("category", params.category);
  if (typeof params?.organic === "boolean") sp.set("organic", String(params.organic));

  const qs = sp.toString();
  const url = `${BASE_URL}/api/groceries${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
};

// tek ürün detayı
const getProductById = async (id: string): GetProductByIdResponse => {
  const res = await fetch(`${BASE_URL}/api/groceries/${id}`, { cache: "no-store" });
  return res.json();
};

export { getAllProducts, getProductById };
