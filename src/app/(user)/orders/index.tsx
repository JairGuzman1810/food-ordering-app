import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { Text } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import { useMyOrdersList } from "@/src/api/orders";
import { useColorScheme } from "@/src/components/useColorScheme";

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const { data: orders, isLoading, error, refetch } = useMyOrdersList();

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
              //Styles to the rows and around
              contentContainerStyle={{ gap: 10, padding: 10 }}
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
