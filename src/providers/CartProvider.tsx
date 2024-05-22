import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import { CartItem, Product } from "@/src/types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: String, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
  isLoading: boolean;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
  isLoading: false,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { mutate: insertOrder } = useInsertOrder();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingCartItem = items.find(
      (c) => c.product_id === product.id && c.size === size
    );

    if (existingCartItem) {
      updateQuantity(existingCartItem.id, 1);
    } else {
      const newCartItem: CartItem = {
        id: randomUUID(),
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };
      setItems([newCartItem, ...items]);
    }
  };

  const updateQuantity = (itemId: String, amount: -1 | 1) => {
    const updateItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);

    setItems(updateItems);
  };

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    setIsLoading(true);
    insertOrder(
      { total },
      {
        onSuccess: (data) => {
          setIsLoading(false);
          clearCart();
          router.push(`/(user)/orders`);
          //its needed to fix issue navigation
          setTimeout(() => {
            router.push(`/(user)/orders/${data.id}`);
          }, 100); // Adjust the timeout as needed
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        total,
        checkout,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
