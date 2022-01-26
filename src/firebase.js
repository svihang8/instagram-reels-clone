// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPy6b9xe2r9H5_STcXFI1l0qReGmG6UjY",
    authDomain: "reels-clone-90c95.firebaseapp.com",
    projectId: "reels-clone-90c95",
    storageBucket: "reels-clone-90c95.appspot.com",
    messagingSenderId: "583919595501",
    appId: "1:583919595501:web:308dd4fa0c98db5ff741e4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

export const database = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  comments: firestore.collection('comments')
}

export const storage = firebase.storage();