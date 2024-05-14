// CartScreen.tsx
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@providers/CartProvider";
import { Stack } from "expo-router";
import CartListItem from "@components/CartListItem";
import { Text } from "@components/Themed";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Shopping Cart" }} />
      {items.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        <FlatList
          data={items}
          contentContainerStyle={{ gap: 15, padding: 20 }}
          //Styles to the columns/between
          renderItem={({ item }) => <CartListItem cartItem={item} />}
        />
      )}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
