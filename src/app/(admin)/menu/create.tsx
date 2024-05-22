import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Stack, useLocalSearchParams } from "expo-router";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { useInsertProduct } from "@/src/api/products";

interface Errors {
  name: string;
  price: string;
  image: string;
}

const CreateProductScreen: React.FC = () => {
  //get the ID when it is to update the product
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;
  const { mutate: insertProduct } = useInsertProduct();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    name: "",
    price: "",
    image: "",
  });

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const validateFields = () => {
    const newErrors: Errors = { name: "", price: "", image: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(price))) {
      newErrors.price = "Price is not a number";
    }

    /*if (!image) {
      newErrors.image = "Image is required";
    }*/

    return newErrors;
  };

  const resetFields = () => {
    setName("");
    setPrice("");
    setImage(null);
    setErrors({ name: "", price: "", image: "" }); // Clear errors
  };

  const onCreate = () => {
    const newErrors = validateFields();

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setIsLoadingSubmit(true);
    // Perform your loading action here
    // After the action is complete, set isLoading back to false
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          setIsLoadingSubmit(false);
          resetFields();
        },
      }
    );
  };

  const onUpdate = () => {
    const newErrors = validateFields();

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setIsLoadingSubmit(true);
    // Perform your loading action here
    // After the action is complete, set isLoading back to false
    setTimeout(() => {
      setIsLoadingSubmit(false);
      resetFields();

      console.warn("Updated product");
    }, 1000); // Example: Simulating loading for 1 second
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setErrors({ ...errors, image: "" }); // Clear image error when user selects an image
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    setErrors({ ...errors, name: "" }); // Clear name error when user starts typing
  };

  const handlePriceChange = (text: string) => {
    setPrice(text);
    setErrors({ ...errors, price: "" }); // Clear price error when user starts typing
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel", // Optional: Add a style for cancel button
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const onDelete = () => {
    console.warn("DELETE");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.textbtn}>Select image</Text>
      </TouchableOpacity>
      {errors.image ? <Text style={styles.error}>{errors.image}</Text> : null}

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
        style={[styles.input, { marginBottom: errors.name ? 0 : 20 }]}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

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
        text={isUpdating ? "Update" : "Create"}
        isLoading={isLoadingSubmit}
        onPress={onSubmit}
      />

      {isUpdating && (
        <TouchableOpacity onPress={confirmDelete}>
          <Text style={[styles.textbtn, { fontSize: 16 }]}>Delete</Text>
        </TouchableOpacity>
      )}
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
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 99,
    borderColor: "black",
  },
  textbtn: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
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
