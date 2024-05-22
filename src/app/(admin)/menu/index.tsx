import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import { Text } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useState } from "react";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const { data: products, isLoading, error, refetch } = useProductList();

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
          {products && products.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No products available</Text>
            </View>
          ) : (
            <FlatList
              data={products}
              renderItem={({ item }) => <ProductListItem product={item} />}
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
