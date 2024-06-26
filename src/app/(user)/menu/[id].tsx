import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useCart } from "@providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";
import RemoteImage from "@/src/components/RemoteImage";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const productId = Array.isArray(id) ? id[0] : id || ""; // Take the first element if it's an array, or use an empty string if it's undefined

  const { data: product, isLoading, error } = useProduct(parseInt(productId)); // Perform null check and convert ID to string if it exists

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const [loading, setLoading] = useState(false);

  const { addItem } = useCart();
  const router = useRouter();
  //Obtain product of dummy data by id

  const colorScheme = useColorScheme();

  const addToCart = () => {
    if (!product) {
      return;
    }
    setLoading(true);
    // Perform your loading action here
    // After the action is complete, set isLoading back to false
    addItem(product, selectedSize);
    setTimeout(() => {
      setLoading(false);
      router.push("/cart");
    }, 500); // Example: Simulating loading for 2 seconds
  };

  const LoadingIndicator = () => (
    <View style={styles.centered}>
      <ActivityIndicator size={"large"} />
    </View>
  );

  const ErrorMessage = ({ message }: { message: string }) => (
    <View style={styles.centered}>
      <Text>Error: {message}</Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? "light"].backgroundCard,
        },
      ]}
    >
      {/* if still loading only show the loading icon */}
      {isLoading && <LoadingIndicator />}
      {/* if something goes wrong then show only message and not content */}
      {error && <ErrorMessage message={error.message} />}
      {/* if for some reason the product its not found, then show this */}
      {!product && !isLoading && !error && (
        <View style={styles.centered}>
          <Text>Product not found</Text>
        </View>
      )}
      {/* if product its load and there are not error show ui with data */}
      {!isLoading && !error && product && (
        <>
          <Stack.Screen options={{ title: product.name }} />
          <RemoteImage
            style={styles.image}
            path={product?.image}
            fallback={defaultPizzaImage}
          />
          <Text>Select size</Text>
          <View style={styles.sizes}>
            {sizes.map((size) => (
              <TouchableOpacity
                onPress={() => setSelectedSize(size)}
                key={size}
                disabled={loading}
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
          <Button text="Add to cart" isLoading={loading} onPress={addToCart} />
        </>
      )}
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizes: {
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
  centered: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
