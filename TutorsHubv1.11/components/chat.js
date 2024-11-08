import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebaseconfig'; // Ensure auth is exported from firebaseconfig
import { onAuthStateChanged } from 'firebase/auth';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          _id: authUser.uid,
          name: authUser.displayName || 'User',
          avatar: authUser.photoURL || 'https://placeimg.com/140/140/any',
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Fetch messages in real-time from Firestore
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        user: doc.data().user,
      }));
      setMessages(messagesList);
    });

    return () => unsubscribeMessages();
  }, []);

  // Send message to Firestore
  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    
    try {
      await addDoc(collection(db, 'messages'), {
        _id,
        createdAt: serverTimestamp(),
        text,
        user,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  // Conditional rendering for unauthenticated users
  if (!user) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logoBlack.png')} style={styles.logoImage} />
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 'guest',
            name: 'Guest',
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logoImage} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={user}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    width: 50,
    height: 40,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
