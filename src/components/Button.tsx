import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { forwardRef } from "react";

type ButtonProps = {
  text: string;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const Button = forwardRef<TouchableOpacity | null, ButtonProps>(
  ({ text, isLoading = false, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        style={[styles.container, isLoading && styles.disabled]}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? (
          <ActivityIndicator color="white" size={"small"} /> // Display loading indicator
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  disabled: {
    opacity: 0.5, // Reduce opacity when button is disabled
    paddingVertical: 15.7,
  },
});

export default Button;
