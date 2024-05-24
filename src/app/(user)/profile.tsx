import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useAuth } from "@/src/providers/AuthProvider";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";

export default function Profile() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const { session } = useAuth();
  // Function to handle logout
  const handleLogout = async () => {
    // Your logout logic here
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.profileContainer,
          { backgroundColor: colors.backgroundCard },
        ]}
      >
        <Image
          source={{ uri: defaultPizzaImage }}
          style={styles.profileImage}
        />
        <Text style={styles.email}>{session?.user.email}</Text>
      </View>
      <Button
        text="Log out"
        style={styles.logoutButton}
        onPress={handleLogout}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "80%", // Adjust the width as needed
    marginTop: 20,
  },
});
