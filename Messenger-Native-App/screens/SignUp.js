import React, { useContext, useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);
  const { register } = useContext(AuthContext);
  useEffect(() => {
    mounted.current = true;
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    return () => (mounted.current = false);
  }, []);
  const registerAsync = async ({ email, password, password2 }) => {
    if (password !== password2) {
      return;
    }
    setLoading(true);
    if (mounted.current) {
      await register(email, password, image);
    }
    setLoading(false);
  };
  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Create Account</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <FormInput
          iconName="user"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="black"
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          iconName="lock"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="black"
          placeholder="Password"
          secureTextEntry
        />
        <FormInput
          iconName="lock"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          placeholderTextColor="black"
          placeholder="Confirm Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={getImage} style={styles.button}>
        <Text style={{ color: "#fff" }}>Upload Profile Image</Text>
      </TouchableOpacity>
      <FormButton
        text="Sign Up"
        color="#1197F6"
        onPress={() => registerAsync({ email, password, password2 })}
      />
      <SocialButton
        text="Sign In with Facebook"
        color="#c0d9ea"
        textColor="#1969ea"
        iconColor="#1969ea"
        iconName="facebook"
      />
      <SocialButton
        text="Sign In with Google"
        color="#f9acb5"
        textColor="#ef3e53"
        iconColor="#ef3e53"
        iconName="google"
      />
      <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#1197f6",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "dodgerblue",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
});
