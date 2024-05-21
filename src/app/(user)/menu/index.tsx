import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import { supabase } from "@/src/lib/supabase";
import { Product } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Text } from "@/src/components/Themed";
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
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].tint}
          />
        </View>
      ) : error ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Error: {error.message}</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
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
