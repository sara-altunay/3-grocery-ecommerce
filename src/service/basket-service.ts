import {
  CheckoutSingleItemResponse,
  GetCartResponse,
  GetOrdersResponse,
  Product,
} from "@/types";

// API base:
// - On the client, use relative path "" (same-origin)
// - On the server (RSC/route handlers), use an absolute origin to avoid "Failed to parse URL" errors
const IS_SERVER = typeof window === "undefined";
const BASE_URL = IS_SERVER
  ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  : "";
const ENV_USER_ID = process.env.NEXT_PUBLIC_USER_ID;

// sepetteki ürünleri getir
const getCart = async (userId?: string): GetCartResponse => {
  const uid = userId ?? ENV_USER_ID;
  const res = await fetch(`${BASE_URL}/api/cart?userId=${uid}`, { cache: "no-store" });
  return res.json();
};

// sepete ürün ekle
const addToBasket = async (groceryId: string, quantity: number, userIdOverride?: string) => {
  const uid = userIdOverride ?? (typeof window !== 'undefined' ? (localStorage.getItem('userId') || ENV_USER_ID) : ENV_USER_ID);
  const response = await fetch(`${BASE_URL}/api/cart`, {
    method: "POST",
    body: JSON.stringify({ userId: uid, groceryId, quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Ürün sepete eklenemedi");
  }
  return data;
};

// bir ürün için satın alma url'i oluştur
const checkoutSingleItem = async (
  grocery: Product,
  quantity: number
): CheckoutSingleItemResponse => {
  const activeUid = (typeof window !== 'undefined'
    ? (localStorage.getItem('userId') ||
       document.cookie.split(";").map(s=>s.trim()).find(s=>s.startsWith("userId="))?.split("=")[1])
    : undefined) || ENV_USER_ID;

  const customerName = activeUid === 'saraaltunay' ? 'Sara Altunay' : (activeUid === 'furkanevin' ? 'Furkan Evin' : activeUid);

  const body = {
    grocery: {
      _id: grocery._id,
      name: grocery.name,
      price: grocery.price,
      description: grocery.description,
    },
    quantity,
    customerInfo: {
      userId: activeUid,
      name: customerName,
      phone: "555 666 77 88",
      deliveryAddress: "istanbul 123 sok. 456 apt. 789",
      isDelivery: true,
    },
  };

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

// sepetteki bütün ürenler için satın alma url'i oluştur
const checkoutAllItems = async (): CheckoutSingleItemResponse => {
  const activeUid = (typeof window !== 'undefined'
    ? (localStorage.getItem('userId') ||
       document.cookie.split(";").map(s=>s.trim()).find(s=>s.startsWith("userId="))?.split("=")[1])
    : undefined) || ENV_USER_ID;

  const body = {
    userId: activeUid,
    customerInfo: {
      userId: activeUid,
      name: (activeUid === 'saraaltunay' ? 'Sara Altunay' : (activeUid === 'furkanevin' ? 'Furkan Evin' : activeUid)),
      phone: "555 666 77 88",
      deliveryAddress: "istanbul 123 sok. 456 apt. 789",
      isDelivery: true,
    },
  };

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

// ürünün miktarını arttır / azalt
const updateCartItem = async (groceryId: string, quantity: number, userIdOverride?: string) => {
  const uid = userIdOverride ?? (typeof window !== 'undefined' ? (localStorage.getItem('userId') || ENV_USER_ID) : ENV_USER_ID);
  const res = await fetch(`${BASE_URL}/api/cart/item`, {
    method: "PUT",
    body: JSON.stringify({ userId: uid, groceryId, quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

// ürünü sepetten sil
const deleteCartItem = async (groceryId: string, userIdOverride?: string) => {
  const uid = userIdOverride ?? (typeof window !== 'undefined' ? (localStorage.getItem('userId') || ENV_USER_ID) : ENV_USER_ID);
  const res = await fetch(
    `${BASE_URL}/api/cart/item?userId=${uid}&groceryId=${groceryId}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
};

// sepeti temizle
const clearCart = async (userIdOverride?: string) => {
  const uid = userIdOverride ?? (typeof window !== 'undefined' ? (localStorage.getItem('userId') || ENV_USER_ID) : ENV_USER_ID);
  const res = await fetch(`${BASE_URL}/api/cart?userId=${uid}`, {
    method: "DELETE",
  });

  return res.json();
};

// yapılan siparişleri al
const getOrders = async (userIdOverride?: string): GetOrdersResponse => {
  const resolvedUid = userIdOverride || ((typeof window !== 'undefined'
    ? (localStorage.getItem('userId') ||
       document.cookie.split(";").map(s=>s.trim()).find(s=>s.startsWith("userId="))?.split("=")[1])
    : undefined) || ENV_USER_ID);

  const res = await fetch(`${BASE_URL}/api/orders?customer_id=${resolvedUid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export {
  getCart,
  addToBasket,
  checkoutSingleItem,
  checkoutAllItems,
  updateCartItem,
  deleteCartItem,
  clearCart,
  getOrders,
};
