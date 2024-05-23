import { Stack } from "expo-router";
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
