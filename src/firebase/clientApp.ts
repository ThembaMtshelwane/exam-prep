// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"
import { initializeApp, getApp, getApps } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyAamHBJI26YfQKQZToVo4B1A1TvSipDAfs",
//   authDomain: "wits-feedback-app.firebaseapp.com",
//   databaseURL: "https://wits-feedback-app-default-rtdb.firebaseio.com",
//   projectId: "wits-feedback-app",
//   storageBucket: "wits-feedback-app.appspot.com",
//   messagingSenderId: "267045309390",
//   appId: "1:267045309390:web:36763bea676359fd2bf99f",
//   measurementId: "G-8KE1G867RX"
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase fo Server Side Rendering
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {app,firestore,auth,storage}
