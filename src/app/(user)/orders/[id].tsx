import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";

import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrderDetails } from "@/src/api/orders";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const orderId = Array.isArray(id) ? id[0] : id || ""; // Take the first element if it's an array, or use an empty string if it's undefined

  const {
    data: order,
    error,
    isLoading,
    refetch,
  } = useOrderDetails(parseInt(orderId));

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.subcontainer}>
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].tint}
          />
        </View>
      ) : error ? (
        <View style={styles.subcontainer}>
          <Text>Error: {error.message}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {!order ? (
            <View style={styles.subcontainer}>
              <Text>No order found</Text>
            </View>
          ) : (
            <>
              <Stack.Screen options={{ title: "Order #" + order?.id }} />

              <OrderListItem order={order} />

              <FlatList
                data={order.order_items}
                renderItem={({ item }) => (
                  <OrderItemListItem orderItem={item} />
                )}
                //Styles to the rows and around
                contentContainerStyle={{ gap: 10, padding: 10 }}
                //Styles to the columns/between
              />
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  subcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
