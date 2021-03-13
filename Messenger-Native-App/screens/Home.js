import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.userImg }}
        style={{ width: 100, height: 100 }}
      />
      <Text>Welcome, {user.email}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
