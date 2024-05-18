import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";

interface Errors {
  email: string;
  password: string;
}

const SignUpScreen = () => {
  //get the ID when it is to update the product
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  const validateFields = () => {
    const newErrors: Errors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  async function signUpWithEmail() {
    const newErrors = validateFields();

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setIsLoading(false);
  }

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrors({ ...errors, email: "" }); // Clear email error when user starts typing
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrors({ ...errors, password: "" }); // Clear password error when user starts typing
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="example@hotmail.com"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        style={[styles.input, { marginBottom: errors.email ? 0 : 20 }]}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
        style={[styles.input, { marginBottom: errors.password ? 0 : 20 }]}
      />
      {errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}

      <Button
        text={"Create account"}
        isLoading={isLoading}
        onPress={signUpWithEmail}
      />

      <Link href={"/sign-in"} asChild>
        <TouchableOpacity>
          <Text style={[styles.textbtn, { fontSize: 16 }]}>Sign in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default SignUpScreen;

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
