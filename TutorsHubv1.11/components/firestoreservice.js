// firestoreService.js
import { db } from './firebaseconfig';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export const sendMessage = async (message) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      text: message,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const fetchMessages = async () => {
  try {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};
