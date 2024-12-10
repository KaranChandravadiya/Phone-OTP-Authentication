import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBP0YqroVSafjnqNM4WbEB1stgQ94w7VA",
  authDomain: "send-otp-55e06.firebaseapp.com",
  projectId: "send-otp-55e06",
  storageBucket: "send-otp-55e06.firebasestorage.app",
  messagingSenderId: "425751054401",
  appId: "1:425751054401:web:c4ee01c8a92d72e15f1ec0",
  measurementId: "G-3HJK91DEQJ"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
