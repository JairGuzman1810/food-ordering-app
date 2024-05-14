import { Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@providers/CartProvider";
import { Text } from "../components/Themed";
import { Stack } from "expo-router";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <Stack.Screen options={{ title: "Shopping Cart" }} />

      <Text>Cart Items length: {items.length}</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
