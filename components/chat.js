import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseconfig';
import { UserContext } from '../UserContext';

export default function ChatScreen() {
  const { user } = useContext(UserContext); // Logged-in user
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Selected user
  const userList = Array.from({ length: 50 }, (_, i) => `user id ${i + 1}`); // First 50 users

  // Generate a unique collection name for two users
  const getCollectionName = (user1, user2) => {
    // Ensure both IDs are strings in the same format
    const stringUser1 = typeof user1 === "number" ? `user id ${user1}` : user1;
    const stringUser2 = typeof user2 === "number" ? `user id ${user2}` : user2;

    if (!stringUser1 || !stringUser2) {
      console.error("Invalid user IDs:", { stringUser1, stringUser2 }); // Log unexpected values
      return null; // Prevent further execution if IDs are invalid
    }

    try {
      const numUser1 = parseInt(stringUser1.replace("user id ", ""), 10); // Convert to number
      const numUser2 = parseInt(stringUser2.replace("user id ", ""), 10); // Convert to number
      if (isNaN(numUser1) || isNaN(numUser2)) {
        console.error("User IDs must be valid numbers after parsing:", { numUser1, numUser2 });
        return null;
      }
      const sortedIds = [numUser1, numUser2].sort((a, b) => a - b); // Sort numerically
      return `messages_user${sortedIds[0]}_to_user${sortedIds[1]}`;
    } catch (error) {
      console.error("Error while generating collection name:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!selectedUser) return;

    const collectionName = getCollectionName(user.userID, selectedUser);
    if (!collectionName) return; // Stop execution if the collection name is invalid

    const q = query(
      collection(db, collectionName), // Unique collection for these two users
      orderBy('createdAt', 'desc')
    );

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
  }, [selectedUser]);

  const onSend = useCallback(
    (messages = []) => {
      const { _id, createdAt, text, user: senderUser } = messages[0];
      const collectionName = getCollectionName(user.userID, selectedUser);
      if (!collectionName) return; // Stop execution if the collection name is invalid

      addDoc(collection(db, collectionName), {
        _id,
        createdAt,
        text,
        user: {
          _id: user.userID,
          name: senderUser.name || 'User',
        },
      });
    },
    [selectedUser, user]
  );

  const handleUserSelect = (userId) => {
    setSelectedUser(userId); // Set the selected user
  };

  if (!selectedUser) {
    // User list screen with scrollable list
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User List</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {userList.map((userId, index) => (
            <TouchableOpacity
              key={index}
              style={styles.userButton}
              onPress={() => handleUserSelect(userId)}
            >
              <Text style={styles.userText}>{userId}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    // Chat screen
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedUser(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedUser}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.userID,
          name: 'User',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 16, // Add padding to ensure the last item is not clipped
  },
  userButton: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    height: 60,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
    marginLeft: -40, // Centers the title properly
  },
});
