import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOTv_d5YPVLAi3Ixnl5GNWgEukRg-0g5A",
  authDomain: "i-clone0.firebaseapp.com",
  databaseURL: "https://i-clone0-default-rtdb.firebaseio.com",
  projectId: "i-clone0",
  storageBucket: "i-clone0.appspot.com",
  messagingSenderId: "303716436538",
  appId: "1:303716436538:web:155ce3f44c1157603b4303",
  measurementId: "G-80QBKSD154"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const storage=firebase.storage();
const auth=firebase.auth();

export {db,auth,storage}
