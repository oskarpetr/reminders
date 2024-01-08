import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgBqGFmH5kxv3q3n2lCGayIMnYLBpzF9c",
  authDomain: "reminders-oskarpetr.firebaseapp.com",
  projectId: "reminders-oskarpetr",
  storageBucket: "reminders-oskarpetr.appspot.com",
  messagingSenderId: "542600243623",
  appId: "1:542600243623:web:479d9fd7d85ac11aaf2e82",
  measurementId: "G-JTPNKZP7ZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
