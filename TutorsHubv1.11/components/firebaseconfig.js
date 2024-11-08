import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyCRwcrfEANLlDolNB7gaWkwyibXlMEzX_E",
    authDomain: "messagingservicereact.firebaseapp.com",
    projectId: "messagingservicereact",
    storageBucket: "messagingservicereact.firebasestorage.app",
    messagingSenderId: "637783328125",
    appId: "1:637783328125:web:6362f5f5de6b4d5b4e3814",
    measurementId: "G-XYXE5MNNSH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };