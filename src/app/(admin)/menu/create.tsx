import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Stack } from "expo-router";

interface Errors {
  name: string;
  price: string;
}

const CreateProductScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ name: "", price: "" });

  const onCreate = () => {
    const newErrors: Errors = { ...errors };

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    }

    if (isNaN(parseFloat(price))) {
      newErrors.price = "Price is not a number";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Perform your loading action here
    // After the action is complete, set isLoading back to false
    setTimeout(() => {
      setIsLoading(false);
      setName("");
      setPrice("");
      setErrors({ name: "", price: "" }); // Clear errors
    }, 1000); // Example: Simulating loading for 1 second
  };

  const handleNameChange = (text: string) => {
    setName(text);
    setErrors({ ...errors, name: "" }); // Clear name error when user starts typing
  };

  const handlePriceChange = (text: string) => {
    setPrice(text);
    setErrors({ ...errors, price: "" }); // Clear price error when user starts typing
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create new product" }} />

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
        style={[styles.input, { marginBottom: errors.name ? 0 : 20 }]}
      />
      {errors.name ? <Text style={[styles.error]}>{errors.name}</Text> : null}

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        value={price}
        onChangeText={handlePriceChange}
        style={[styles.input, { marginBottom: errors.price ? 0 : 20 }]}
        keyboardType="numeric"
      />
      {errors.price ? <Text style={styles.error}>{errors.price}</Text> : null}

      <Button
        text="Create"
        style={{ backgroundColor: "gray" }}
        isLoading={isLoading}
        onPress={onCreate}
      />
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: { color: "gray", fontSize: 16 },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
  },
});
