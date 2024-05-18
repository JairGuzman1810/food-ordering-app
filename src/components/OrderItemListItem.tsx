import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import Colors from "@/src/constants/Colors";
import { OrderItem } from "@/src/types";

type OrderItemListItemProps = {
  orderItem: OrderItem;
};

const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].backgroundCard },
      ]}
    >
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: orderItem.products.image || defaultPizzaImage }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{orderItem.products.name}</Text>
        <View style={styles.subcontainer}>
          <Text style={styles.price}>${orderItem.products.price}</Text>
          <Text>Size: {orderItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{orderItem.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemListItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subcontainer: {
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
    marginRight: 20,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
});
