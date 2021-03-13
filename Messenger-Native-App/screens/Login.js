import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../context/AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <View>
        <FormInput
          iconName="user"
          placeholder="Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <FormInput
          iconName="lock"
          placeholder="Password"
          placeholderTextColor="#000"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <FormButton
        text="Sign In"
        color="#1197F6"
        onPress={() => login(email, password)}
      />
      <TouchableOpacity style={{ marginVertical: 25 }}>
        <Text style={styles.text}>Forgot Password?</Text>
      </TouchableOpacity>
      <SocialButton
        text="Sign In with Facebook"
        color="#c0d9ea"
        textColor="#1969ea"
        iconColor="#1969ea"
        iconName="facebook"
        onPress={() => {}}
      />
      <SocialButton
        text="Sign In with Google"
        color="#f9acb5"
        textColor="#ef3e53"
        iconColor="#ef3e53"
        iconName="google"
        onPress={() => {}}
      />
      <TouchableOpacity onPress={() => navigation?.navigate("SignUp")}>
        <Text style={styles.text}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 220,
  },
  text: {
    color: "#1197f6",
    fontWeight: "bold",
  },
});
