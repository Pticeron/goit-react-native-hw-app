// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAi_CCsqJJLxFObAOBoZR4-mW_m6TPdFEo",
  authDomain: "app-react-native-hw.firebaseapp.com",
  projectId: "app-react-native-hw",
  storageBucket: "app-react-native-hw.appspot.com",
  messagingSenderId: "820417733029",
  appId: "1:820417733029:web:995a2d7a1514b5747c884c",
  measurementId: "G-1XDEQN79K5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
