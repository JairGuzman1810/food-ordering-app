import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useAdminOrdersList } from "@/src/api/orders";
import { useState } from "react";
import Colors from "@/src/constants/Colors";
import { Text } from "@/src/components/Themed";

export default function OrdersScreen() {
  const colorScheme = useColorScheme();
  const { data: orders, isLoading, error, refetch } = useAdminOrdersList();
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
          {orders && orders.length === 0 ? (
            <View style={styles.subcontainer}>
              <Text>No orders available</Text>
            </View>
          ) : (
            <FlatList
              data={orders}
              renderItem={({ item }) => <OrderListItem order={item} />}
              numColumns={2}
              contentContainerStyle={{ gap: 10, padding: 10 }}
              columnWrapperStyle={{ gap: 10 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshData}
                />
              }
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
