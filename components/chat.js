import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseconfig';
import { UserContext } from '../UserContext';

export default function ChatScreen() {
  const { user } = useContext(UserContext); // Get the logged-in user's data
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user,
      }));
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user: senderUser } = messages[0];
    addDoc(collection(db, 'messages'), {
      _id,
      createdAt,
      text,
      user: {
        _id: user.userID, // Logged-in user's unique ID
        name: senderUser.name || 'User', // Optional: Use their name
      },
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.userID, // Pass the logged-in user's ID
          name: 'User', // Optional: Customize with user's name
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
