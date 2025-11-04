"use client";

import { useEffect, useState } from "react";

// Always use relative path on client to avoid wrong ports
const BASE_URL = "";

export default function CartBadge() {
  const [count, setCount] = useState<number>(0);

  const load = async () => {
    try {
      const uid =
        (typeof window !== "undefined" && (localStorage.getItem("userId") ||
          document.cookie.split(";").map(s=>s.trim()).find(s=>s.startsWith("userId="))?.split("=")[1])) ||
        process.env.NEXT_PUBLIC_USER_ID;

      const res = await fetch(`${BASE_URL}/api/cart?userId=${uid}`, { cache: "no-store" });
      const data = await res.json();
      const total = (data?.cart?.items || []).reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      );
      setCount(total);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    load();

    const handler = () => load();
    window.addEventListener("cart:updated", handler);
    return () => window.removeEventListener("cart:updated", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="absolute shadow font-bold text-sm text-shadow-xl right-[-15px] top-[-20px] bg-green-500 text-white rounded-full size-6 grid place-items-center">
      {count}
    </span>
  );
}
