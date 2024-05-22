// CartScreen.tsx
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@providers/CartProvider";
import { Stack } from "expo-router";
import CartListItem from "@components/CartListItem";
import { Text } from "@components/Themed";
import Button from "@components/Button";

const CartScreen = () => {
  const { items, total, checkout, isLoading } = useCart();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Shopping Cart" }} />
      {items.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        <FlatList
          data={items}
          contentContainerStyle={{
            gap: 10,
            padding: 10,
          }}
          //Styles to the columns/between
          renderItem={({ item }) => (
            <CartListItem key={item.id} cartItem={item} />
          )}
        />
      )}
      {total > 0 ? (
        <>
          <Text style={styles.total}>Total: ${total}</Text>
          <Button onPress={checkout} isLoading={isLoading} text="Checkout" />
        </>
      ) : null}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
});
