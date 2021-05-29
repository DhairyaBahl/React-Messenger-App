import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAbYWMmMI23htMWCt6tpvY4gcZVSoXk-Jk',
  authDomain: 'react-app-dc639.firebaseapp.com',
  projectId: 'react-app-dc639',
  storageBucket: 'react-app-dc639.appspot.com',
  messagingSenderId: '199480303224',
  appId: "1:199480303224:web:3ffb8e85b99498d21c178d"
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};


const userRef = firestore.doc(`users/${user.uid}`);
const snapshot = await userRef.get();