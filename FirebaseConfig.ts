// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore" // required for cloud firestore features
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaX-hvAOQYLTnBYD03SbCjr2R-X7EsQ-E",
  authDomain: "cruzhacks2024-e7abc.firebaseapp.com",
  projectId: "cruzhacks2024-e7abc",
  storageBucket: "cruzhacks2024-e7abc.appspot.com",
  messagingSenderId: "938306159197",
  appId: "1:938306159197:web:cfcf0e49489acdfccb83b4",
}

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
