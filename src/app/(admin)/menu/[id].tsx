import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useCart } from "@providers/CartProvider";
import { PizzaSize } from "@/src/types";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();
  //Obtain product of dummy data by id
  const product = products.find((p) => p.id.toString() === id);

  const colorScheme = useColorScheme();

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].backgroundCard },
      ]}
    >
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
      />

      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
  },
});
