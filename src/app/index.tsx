import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "../components/Button";
import Colors from "../constants/Colors";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User"></Button>
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin"></Button>
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link>
      <StatusBar barStyle="light-content" backgroundColor={Colors.light.tint} />
    </View>
  );
};

export default index;
