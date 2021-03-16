import React from "react";
import firebase from "firebase/app";
import AuthProvider from "./context/AuthContext";
import Navigation from "./navigation";
import { LogBox } from "react-native";

const firebaseConfig = {
  apiKey: "Place your Project Api key here",
  authDomain: "Place your authDomain here",
  projectId: "Place your projectId here",
  storageBucket: "Place your storage bucket here",
  messagingSenderId: "Place your messaging sender ID here",
  appId: "Place your app id here",
  measurementId: "Place your measurement ID here",
};

LogBox.ignoreLogs(["Setting a timer"]);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
