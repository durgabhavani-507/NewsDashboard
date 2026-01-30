import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyASdf_MQWEgqL3fp52jz3zWpd9julSjIQY",
  authDomain: "news-app-4904e.firebaseapp.com",
  projectId: "news-app-4904e",
  storageBucket: "news-app-4904e.firebasestorage.app",
  messagingSenderId: "716290213326",
  appId: "1:716290213326:web:dd80e0ec70b546783f179f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
