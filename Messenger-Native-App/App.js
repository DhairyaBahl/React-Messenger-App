import React from "react";
import firebase from "firebase/app";
import AuthProvider from "./context/AuthContext";
import Navigation from "./navigation";
import { LogBox } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAVjsJFNHh5D3rGib3e2TAACbXKwqeCdUU",
  authDomain: "gssoc-messenger.firebaseapp.com",
  projectId: "gssoc-messenger",
  storageBucket: "gssoc-messenger.appspot.com",
  messagingSenderId: "792499487270",
  appId: "1:792499487270:web:ea13ab4b0fbf997f41dce7",
  measurementId: "G-N7WPBFY6CS",
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
