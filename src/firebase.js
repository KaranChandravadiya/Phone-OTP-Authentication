// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyAyVvNw2RS06B2xzO2hq1BAVahhnTh6czY",
  // authDomain: "notification-3027c.firebaseapp.com",
  // projectId: "notification-3027c",
  // storageBucket: "notification-3027c.firebasestorage.app",
  // messagingSenderId: "855058350393",
  // appId: "1:855058350393:web:259463b279ad241b0ca8e8"

  apiKey: "AIzaSyBBP0YqroVSafjnqNM4WbEB1stgQ94w7VA",
  authDomain: "send-otp-55e06.firebaseapp.com",
  projectId: "send-otp-55e06",
  storageBucket: "send-otp-55e06.firebasestorage.app",
  messagingSenderId: "425751054401",
  appId: "1:425751054401:web:c4ee01c8a92d72e15f1ec0",
  measurementId: "G-3HJK91DEQJ"
};


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)

firebase.initializeApp(firebaseConfig);
export default firebase;
