import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const AutoAuth = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null || value !== undefined) {
          const userData = await getUserData();
          if (userData) {
            setUser(userData);
          } else {
            navigation.navigate("Login");
          }
        }
      } catch (err) {
        console.log("error fetching user token");
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator color="dodgerblue" size="large" />
    </View>
  );
};

export default AutoAuth;

const styles = StyleSheet.create({});
