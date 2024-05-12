import Colors from "@/src/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import products from "@/assets/data/products";

const product = products[1];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 10,
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
