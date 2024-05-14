import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import { Product } from "@/src/types";
import { Link } from "expo-router";
import { Text } from "./Themed";
import { useColorScheme } from "@/src/components/useColorScheme";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
//Prop typing
type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    //Navigate specific product
    <Link
      href={`/menu/${product.id}`}
      asChild
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
    >
      <TouchableOpacity>
        <Image
          style={styles.image}
          //If image exist use product.image if not, defaultPizzaImage
          source={{
            uri: product.image || defaultPizzaImage,
          }}
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
