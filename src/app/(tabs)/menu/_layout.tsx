import { Stack } from "expo-router";
//Nested tab navigation of menu and product details
export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
