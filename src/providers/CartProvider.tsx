import {
  createContext,
  useContext,
  ReactNode,
  PropsWithChildren,
  useState,
} from "react";
import { CartItem, Product } from "@/src/types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: String, amount: -1 | 1) => void;
  total: number;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingCartItem = items.find(
      (c) => c.product_id === product.id && c.size === size
    );

    //check if exist
    if (existingCartItem) {
      updateQuantity(existingCartItem.id, 1);
      //if not, then create a new
    } else {
      //if yes, then update existing

      const newCartItem: CartItem = {
        id: randomUUID(), // generate
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };
      setItems([newCartItem, ...items]);
    }
  };

  const updateQuantity = (itemId: String, amount: -1 | 1) => {
    //check if quantity > 0, then remove it
    const updateItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);

    setItems(updateItems);
  };

  // Calculate the total of all items in the cart
  const total = items.reduce((sum, item) => {
    // Multiply the product price by the quantity and add to the accumulator
    return sum + item.product.price * item.quantity;
  }, 0); // 0 is the initial value of the accumulator

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
