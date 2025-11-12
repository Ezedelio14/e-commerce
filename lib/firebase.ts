import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAQkvh3fVr9OkZ7z0zbqUyG4yPKS9jH0KU",
  authDomain: "feedify-65b3d.firebaseapp.com",
  projectId: "feedify-65b3d",
  storageBucket: "feedify-65b3d.firebasestorage.app",
  messagingSenderId: "554940473821",
  appId: "1:554940473821:web:b473cdc625342a70749634",
  measurementId: "G-184CHSGZ57",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
