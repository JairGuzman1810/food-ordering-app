import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import Button from "@components/Button";
import Colors from "@/src/constants/Colors";
import { useAuth } from "@providers/AuthProvider";
import { supabase } from "../lib/supabase";

const index = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }
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

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />

      <StatusBar barStyle="light-content" backgroundColor={Colors.light.tint} />
    </View>
  );
};

export default index;
