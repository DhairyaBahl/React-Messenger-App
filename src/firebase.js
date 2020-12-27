import firebase from "firebase";

const firebaseConfig={
  apiKey:"AIzaSyDBvyyqdV630DffF6sVYP6v3TZWZjHxamg",
  authDomain:"mui-message.firebaseapp.com",
  databaseURL:"https://mui-message-default-rtdb.firebaseio.com",
  projectId:"mui-message",
  storageBucket:"mui-message.appspot.com",
  messagingSenderId:"506461386312",
  appId:"1:506461386312:web:45f666e6778fed26d9ca7d",
  measurementId:"G-HVDGKL164W"
}

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();

export default db;
