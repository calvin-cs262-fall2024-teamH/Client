import { auth } from './firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from './firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user.uid; // Return unique Firebase user ID
  } catch (error) {
    console.error('Error signing in:', error);
    throw error; // Rethrow for handling in the component
  }
};

export const register = async (email, password, additionalInfo = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user details to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      userID: user.uid,
      email: user.email,
      ...additionalInfo,
      createdAt: new Date(),
    });

    return user.uid;
  } catch (error) {
    console.error('Error registering:', error);
    throw error; // Rethrow for handling in the component
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
