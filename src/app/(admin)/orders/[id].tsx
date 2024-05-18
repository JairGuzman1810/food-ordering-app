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
import { OrderStatus } from "@/src/types";

const statuses: OrderStatus[] = ["New", "Cooking", "Delivering", "Delivered"];

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
      <Text style={styles.statusTitle}>Status</Text>
      <View style={styles.statuses}>
        {statuses.map((status) => (
          <TouchableOpacity
            onPress={() => console.warn("Status updated to: " + status)}
            key={status}
            style={[
              styles.status,
              {
                backgroundColor:
                  order.status === status ? Colors.light.tint : undefined,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: order.status === status ? "white" : Colors.light.tint,
                },
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  statuses: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    gap: 10,
  },
  statusTitle: {
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: "auto",
  },
  status: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
  },
  statusText: {},
});
