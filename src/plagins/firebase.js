import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9ba48X1bXlIc5RmV4n5hcUaJnUsfAy_8",
  authDomain: "smallshop-5247c.firebaseapp.com",
  projectId: "smallshop-5247c",
  storageBucket: "smallshop-5247c.appspot.com",
  messagingSenderId: "507096167100",
  appId: "1:507096167100:web:d0fe21329f765d12cb16b9",
  measurementId: "G-0N89S8S4M2"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);