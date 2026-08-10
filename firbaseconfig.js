// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence,initializeAuth } from "firebase/auth";
import {getFirestore, collection} from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtkMoINGr69rTgQ9KRa_NNoK6Tu6hBKes",
  authDomain: "chat-app-132f9.firebaseapp.com",
  projectId: "chat-app-132f9",
  storageBucket: "chat-app-132f9.firebasestorage.app",
  messagingSenderId: "9914915050",
  appId: "1:9914915050:web:a1c6d3cba03444ab4f1f93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);
export const useref = collection(db,'users');
export const roomref = collection (db, 'rooms');



