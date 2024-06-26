import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Colors from "@/src/constants/Colors";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";

import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatus } from "@/src/types";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";
import {
  notifyUserOrderUpdate,
  notifyAdminNewOrder,
} from "@/src/lib/notifications";

const statuses: OrderStatus[] = ["New", "Cooking", "Delivering", "Delivered"];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  //Obtain product of dummy data by id
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutate: updateOrder } = useUpdateOrder();

  const orderId = Array.isArray(id) ? id[0] : id || ""; // Take the first element if it's an array, or use an empty string if it's undefined

  const { data: order, error, isLoading } = useOrderDetails(parseInt(orderId));

  const colorScheme = useColorScheme();

  const updateStatus = (status: string) => {
    setIsUpdating(true);
    updateOrder(
      { id: parseInt(orderId), updatedFields: { status } },
      {
        onSuccess: async () => {
          if (order) {
            notifyUserOrderUpdate({ ...order, status });
          }
          setIsUpdating(false);
        },
      }
    );
  };

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
              <Text style={styles.statusTitle}>Status</Text>
              <View style={styles.statuses}>
                {isUpdating ? (
                  <View style={{ paddingVertical: 2.55 }}>
                    <ActivityIndicator
                      size={"large"}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  </View>
                ) : (
                  <>
                    {statuses.map((status) => (
                      <TouchableOpacity
                        onPress={() => updateStatus(status)}
                        key={status}
                        style={[
                          styles.status,
                          {
                            backgroundColor:
                              order.status === status
                                ? Colors.light.tint
                                : undefined,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color:
                                order.status === status
                                  ? "white"
                                  : Colors.light.tint,
                            },
                          ]}
                        >
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>
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
  status: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
  },
  statusText: {},
});
