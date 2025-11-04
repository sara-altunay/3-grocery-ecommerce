// Ürün Tipi
type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  origin: string;
  isOrganic: boolean;
  description: string;
  nutritionalValue: string;
  expiryDays: number;
  photo: string;
  __v: 0;
};

// Sepet Tipi
type Cart = {
  _id: string;
  userId: string;
  items: {
    grocery: Product;
    quantity: number;
    price: number;
    name: string;
    _id: string;
  }[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Sipariş Tipi
type Order = {
  _id: string;
  product: Product;
  quantity: number;
  money_spend: number;
  currency: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  is_delivery: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

// API Cevap Tipleri
type GetAllProductsResponse = Promise<{
  groceries: Product[];
}>;

type GetProductByIdResponse = Promise<{
  grocery: Product;
}>;

type CheckoutSingleItemResponse = Promise<{
  url: string;
}>;

type GetCartResponse = Promise<{
  cart: Cart;
}>;

type GetOrdersResponse = Promise<{
  orders: Order[];
}>;

export type {
  GetAllProductsResponse,
  GetProductByIdResponse,
  CheckoutSingleItemResponse,
  GetOrdersResponse,
  GetCartResponse,
  Product,
  Cart,
  Order,
};
