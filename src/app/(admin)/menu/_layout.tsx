import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/src/components/useColorScheme";

//Nested tab navigation of menu and product details
export default function MenuStack() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={"/(admin)/menu/create"} asChild>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                activeOpacity={0.5} // Set activeOpacity to achieve the opacity change on press
              >
                <FontAwesome
                  name="plus-square"
                  size={20}
                  color={Colors[colorScheme ?? "light"].tint}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
