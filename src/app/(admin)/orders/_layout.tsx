import { Stack } from "expo-router";

//Nested tab navigation of menu and product details
export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
}
