import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { CartItem } from "@/src/types";
import { defaultPizzaImage } from "./ProductListItem";
import Colors from "../constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Text } from "./Themed";
import { useCart } from "@providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import RemoteImage from "./RemoteImage";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const colorScheme = useColorScheme();
  const { updateQuantity } = useCart();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
    >
      {/* image */}
      <RemoteImage
        style={styles.image}
        path={cartItem.product.image}
        fallback={defaultPizzaImage}
        resizeMode="contain"
      />
      {/* product info */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      {/* quantity selector */}
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          size={15}
          style={{ padding: 5 }}
        />
        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          size={15}
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

export default CartListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    marginRight: 10,
    alignSelf: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
});
