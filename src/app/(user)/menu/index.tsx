import { FlatList, View } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      //Styles to the rows and around
      contentContainerStyle={{ gap: 10, padding: 10 }}
      //Styles to the columns/between
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
