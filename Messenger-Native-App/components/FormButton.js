import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const FormButton = ({ text, color, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      {...props}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    borderRadius: 10,
    padding: 17,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});
