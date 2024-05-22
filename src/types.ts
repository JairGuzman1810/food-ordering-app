import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type PizzaSize = "S" | "M" | "L" | "XL";

export type Product = Tables<"products">;

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

export type Order = Tables<"orders">;

export type Profile = {
  avatar_url: string | null;
  full_name: string | null;
  group: string; // Assuming group is always present and is a string
  id: string;
  updated_at: string | null; // Assuming updated_at is a string representing a date
  username: string | null;
  website: string | null;
};
