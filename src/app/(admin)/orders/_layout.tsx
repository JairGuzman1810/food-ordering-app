import { Stack } from "expo-router";
import { useColorScheme } from "@/src/components/useColorScheme";

//Nested tab navigation of menu and product details
export default function MenuStack() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
}
