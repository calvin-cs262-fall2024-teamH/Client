import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { db } from './firebaseconfig';
import { UserContext } from '../UserContext';

export default function ChatScreen() {
  const { user } = useContext(UserContext); // Logged-in user
  const route = useRoute(); // Data from SectionItem
  const { tutorName, triggerButton } = route.params || {}; // Params from SectionItem
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Selected tutor
  const [searchText, setSearchText] = useState(''); // Search bar state
  const tutors = [
    { tutorname: "John Doe", userid: 2, tutorid: 1 },
    { tutorname: "Jane Smith", userid: 3, tutorid: 2 },
    { tutorname: "Michael Johnson", userid: 4, tutorid: 3 },
    { tutorname: "Emily Davis", userid: 5, tutorid: 4 },
    { tutorname: "William Brown", userid: 6, tutorid: 5 },
    { tutorname: "Olivia Wilson", userid: 7, tutorid: 6 },
    { tutorname: "James Taylor", userid: 8, tutorid: 7 },
    { tutorname: "Sophia Miller", userid: 9, tutorid: 8 },
    { tutorname: "David Martinez", userid: 10, tutorid: 9 },
    { tutorname: "Isabella Hernandez", userid: 11, tutorid: 10 },
    { tutorname: "Lucas Garcia", userid: 12, tutorid: 11 },
    { tutorname: "Ava Rodriguez", userid: 13, tutorid: 12 },
    { tutorname: "Ethan Lee", userid: 14, tutorid: 13 },
    { tutorname: "Mia Perez", userid: 15, tutorid: 14 },
    { tutorname: "Alexander Martinez", userid: 16, tutorid: 15 },
    { tutorname: "Charlotte Gonzalez", userid: 17, tutorid: 16 },
    { tutorname: "Benjamin Wilson", userid: 18, tutorid: 17 },
    { tutorname: "Amelia Anderson", userid: 19, tutorid: 18 },
    { tutorname: "Henry Thomas", userid: 20, tutorid: 19 },
    { tutorname: "Lily Jackson", userid: 21, tutorid: 20 },
  ];

  const filteredTutors = tutors.filter((tutor) =>
    tutor.tutorname.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (tutorName && triggerButton) {
      const tutor = tutors.find((t) => t.tutorname === tutorName);

      if (selectedUser && selectedUser.tutorname === tutorName) {
        return;
      }

      setSelectedUser(tutor);
    }
  }, [tutorName, triggerButton]);

  const getCollectionName = (user1, user2) => {
    const stringUser1 = typeof user1 === "number" ? `user id ${user1}` : user1;
    const stringUser2 = typeof user2 === "number" ? `user id ${user2}` : user2;

    try {
      const numUser1 = parseInt(stringUser1.replace("user id ", ""), 10);
      const numUser2 = parseInt(stringUser2.replace("user id ", ""), 10);
      const sortedIds = [numUser1, numUser2].sort((a, b) => a - b);
      return `messages_user${sortedIds[0]}_to_user${sortedIds[1]}`;
    } catch (error) {
      console.error("Error while generating collection name:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!selectedUser) return;

    const collectionName = getCollectionName(user.userID, selectedUser.userid);
    if (!collectionName) return;

    const q = query(
      collection(db, collectionName),
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
      const collectionName = getCollectionName(user.userID, selectedUser.userid);
      if (!collectionName) return;

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

  if (!selectedUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Connect with Your Tutor</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search tutors..."
          placeholderTextColor="#7f8c8d"
          value={searchText}
          onChangeText={setSearchText}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredTutors.map((tutor, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => setSelectedUser(tutor)}
            >
              <Text style={styles.cardTitle}>{tutor.tutorname}</Text>
              <Text style={styles.cardSubtitle}>🎓 Expert in Personalized Learning</Text>
              <Text style={styles.cardAction}>👋 Tap to Connect</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedUser(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedUser.tutorname}</Text>
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
    backgroundColor: '#f3f7fa',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#4b3ae0',
  },
  searchBar: {
    height: 40,
    borderColor: '#4b3ae0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#333',
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4b3ae0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b3ae0',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  cardAction: {
    fontSize: 14,
    color: '#4b3ae0',
    marginTop: 10,
    fontWeight: 'bold',
  },
  header: {
    height: 70,
    backgroundColor: '#4b3ae0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginLeft: -40,
  },
});
