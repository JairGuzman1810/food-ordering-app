import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
//Nested tab navigation of menu and product details
export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <TouchableOpacity
              style={{ marginRight: 15 }}
              activeOpacity={0.5} // Set activeOpacity to achieve the opacity change on press
            >
              <FontAwesome
                name="shopping-cart"
                size={20}
                color={Colors.light.tint}
              />
            </TouchableOpacity>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
        }}
      />
    </Stack>
  );
}
