import firebase from 'firebase/app';
var firebaseConfig = {
  apiKey: "AIzaSyAuNJXhQFT_4_IpmKvIzFaoLDNQyuUeIwA",
  authDomain: "react-messenger-app-f78d6.firebaseapp.com",
  projectId: "react-messenger-app-f78d6",
  storageBucket: "react-messenger-app-f78d6.appspot.com",
  messagingSenderId: "285938146844",
  appId: "1:285938146844:web:98c8c77e0394143c1e09d9",
  measurementId: "G-CTGRYQ2806"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

  export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});