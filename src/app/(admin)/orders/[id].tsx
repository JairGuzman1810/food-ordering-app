import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import orders from "@/assets/data/orders";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";

import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  //Obtain product of dummy data by id
  const order = orders.find((o) => o.id.toString() === id);

  const colorScheme = useColorScheme();

  if (!order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View style={[styles.container]}>
      <Stack.Screen options={{ title: "Order #" + order?.id }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
        //Styles to the rows and around
        contentContainerStyle={{ gap: 10, padding: 10 }}
        //Styles to the columns/between
      />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: "auto",
  },
});
