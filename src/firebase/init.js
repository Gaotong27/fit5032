import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCexDS9bIsjbUvlcTlR8ixqFvH1Otk1nbk",
  authDomain: "week7-tonggao.firebaseapp.com",
  projectId: "week7-tonggao",
  storageBucket: "week7-tonggao.appspot.com",
  messagingSenderId: "410888653972",
  appId: "1:410888653972:web:6119e35560f566f3d4f881"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };