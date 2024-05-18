import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import { Order } from "@/src/types";
import { Link, useSegments } from "expo-router";
import { Text } from "./Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

// Prop typing
type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <TouchableOpacity>
        <View
          style={[styles.touchable, { backgroundColor: colors.backgroundCard }]}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <Text style={styles.createdAt}>
              {dayjs(order.created_at).fromNow()}
            </Text>
          </View>
          <Text style={styles.status}>{order.status}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,

    width: "100%",
  },
  infoContainer: {
    flexDirection: "column",
  },
  orderId: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  createdAt: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
    textAlign: "right",
  },
});
