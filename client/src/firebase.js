// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-blog-73810.firebaseapp.com",
  projectId: "mern-blog-73810",
  storageBucket: "mern-blog-73810.appspot.com",
  messagingSenderId: "236467790691",
  appId: "1:236467790691:web:68449ca8c57bd6356ca956",
  measurementId: "G-PN4VZE2TCE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);