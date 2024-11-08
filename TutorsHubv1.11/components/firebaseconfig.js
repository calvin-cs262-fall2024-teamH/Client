import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCRwcrfEANLlDolNB7gaWkwyibXlMEzX_E",
    authDomain: "messagingservicereact.firebaseapp.com",
    projectId: "messagingservicereact",
    storageBucket: "messagingservicereact.firebasestorage.app",
    messagingSenderId: "637783328125",
    appId: "1:637783328125:web:0eaa993a1d68a8194e3814",
    measurementId: "G-YC5PFMK2X1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };