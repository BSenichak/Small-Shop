import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt_VlNu-Xb7heHAttDvEBPrRxoAY-1vlA",
  authDomain: "shop-f31e9.firebaseapp.com",
  projectId: "shop-f31e9",
  storageBucket: "shop-f31e9.appspot.com",
  messagingSenderId: "661436094356",
  appId: "1:661436094356:web:47116dc2ca5342bfdea181",
  measurementId: "G-H1F7F6DXRN"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)