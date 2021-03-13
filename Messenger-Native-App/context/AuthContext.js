import React, { useState, createContext } from "react";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

async function uploadImageAsync(image) {
  let filename = image.substring(image.lastIndexOf("/") + 1);
  const extension = filename.split(".").pop();
  const name = filename.split(".").slice(0, -1).pop();
  filename = name + Date.now() + "." + extension;
  const imageRef = firebase.storage().ref(`photos/${filename}`);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", image, true);
    xhr.send(null);
  });

  const snapshot = await imageRef.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const AuthContextScreen = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const data = await user.getIdToken();
      try {
        await AsyncStorage.setItem("token", data);
      } catch (err) {
        console.log(err);
      }
      try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem("user", jsonValue);
      } catch (err) {
        console.log(err, " unable to set user object");
      }
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get();
      if (doc.exists) {
        setUser(doc.data());
      }
    } catch (err) {
      console.log(err);
    }
  };
  const register = async (email, password, image) => {
    const userImg = await uploadImageAsync(image);
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const data = await user.getIdToken();
      try {
        await AsyncStorage.setItem("token", data);
      } catch (err) {
        console.log(err);
      }
      try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem("user", jsonValue);
      } catch (err) {
        console.log(err, " unable to set user object");
      }
      // console.log(user);
      await firebase.firestore().collection("users").doc(user?.uid).set({
        email,
        userImg,
      });
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "user"]);
      await firebase.auth().signOut();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider value={{ login, user, setUser, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextScreen;
