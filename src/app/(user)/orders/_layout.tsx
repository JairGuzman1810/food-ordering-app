import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/src/components/useColorScheme";

//Nested tab navigation of menu and product details
export default function MenuStack() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        title: "Orders",
      }}
    ></Stack>
  );
}