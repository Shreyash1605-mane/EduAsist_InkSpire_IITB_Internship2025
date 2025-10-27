// This file configures and initializes the Firebase application.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration with your project's credentials.
const firebaseConfig = {
  apiKey: "AIzaSyALnQiuRJDrhJRWWbKuHt7BaEwwr4hoMUo",
  authDomain: "eduassist-f80e6.firebaseapp.com",
  projectId: "eduassist-f80e6",
  storageBucket: "eduassist-f80e6.appspot.com",
  messagingSenderId: "821662920127",
  appId: "1:821662920127:web:c5b5e171317ac40ea2c50a",
  measurementId: "G-C97ZHFDCXX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
