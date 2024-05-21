export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type Profile = {
  avatar_url: string | null;
  full_name: string | null;
  group: string; // Assuming group is always present and is a string
  id: string;
  updated_at: string | null; // Assuming updated_at is a string representing a date
  username: string | null;
  website: string | null;
};
