import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import { Product } from "@/src/types";
import { Link, useSegments } from "expo-router";
import { Text } from "./Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
//Prop typing
type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  //Use to know where are in navigation (workaround)
  const segments = useSegments();

  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    //Navigate specific product
    <Link
      href={`/${segments[0]}/menu/${product.id}`}
      asChild
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
    >
      <TouchableOpacity>
        <RemoteImage
          style={styles.image}
          //If image exist use product.image if not, defaultPizzaImage
          path={product?.image}
          fallback={defaultPizzaImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    //If numbers of products its odd then, only 50% of width
    maxWidth: "50%",
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontWeight: "600",
    color: Colors.light.tint,
  },
});
