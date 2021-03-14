import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const FormInput = ({ iconName, ...props }) => {
  return (
    <View style={[styles.row, { marginVertical: 10 }]}>
      <View style={styles.iconContainer}>
        <AntDesign name={iconName} size={24} color="black" />
      </View>
      <View>
        <TextInput style={styles.textInput} {...props} />
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  textInput: {
    width: width * 0.8,
    height: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
