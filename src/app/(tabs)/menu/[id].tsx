import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useCart } from "@providers/CartProvider";
import { PizzaSize } from "@/src/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams();
  //Obtain product of dummy data by id
  const product = products.find((p) => p.id.toString() === id);

  const colorScheme = useColorScheme();

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    setIsLoading(true);
    // Perform your loading action here
    // After the action is complete, set isLoading back to false
    addItem(product, selectedSize);
    setTimeout(() => {
      setIsLoading(false);
    }, 250); // Example: Simulating loading for 2 seconds
  };

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
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <TouchableOpacity
            onPress={() => setSelectedSize(size)}
            key={size}
            disabled={isLoading}
            style={[
              styles.size,
              {
                backgroundColor:
                  selectedSize === size ? "gainsboro" : undefined,
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to cart" isLoading={isLoading} onPress={addToCart} />
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
  sizes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: "auto",
  },
});
