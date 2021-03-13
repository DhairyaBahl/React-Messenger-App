import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const FormButton = ({
  text,
  color,
  textColor,
  iconColor,
  iconName,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.row, { backgroundColor: color }]}
      {...props}
    >
      <FontAwesome name={iconName} size={24} color={iconColor} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    borderRadius: 10,
    padding: 17,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
});
