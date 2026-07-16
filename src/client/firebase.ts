import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAP755M5R77mUzpKBBuTE9tVaYAz3Lsxtk",
  authDomain: "resq-62c2f.firebaseapp.com",
  projectId: "resq-62c2f",
  storageBucket: "resq-62c2f.firebasestorage.app",
  messagingSenderId: "139072717291",
  appId: "1:139072717291:web:7fc1121fdec9eb505999ae",
  measurementId: "G-90XMSGGGXF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
