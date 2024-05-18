import { FlatList, View } from "react-native";
import orders from "@assets/data/orders";
import ProductListItem from "@components/ProductListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";

export default function ArchiveScreen() {
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        //Styles to the rows and around
        contentContainerStyle={{ gap: 10, padding: 10 }}
        //Styles to the columns/between
      />
    </View>
  );
}
