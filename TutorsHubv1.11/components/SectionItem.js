import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Navigation kullanımı

const SectionItem = ({ item, onReorder }) => {
  const [bgColor, setBgColor] = useState('#fff'); // Initial background color
  const navigation = useNavigation(); // Navigation instance

  // Function to handle the star button
  const handleStarPress = () => {
    if (bgColor === '#32CD32') {
      setBgColor('#fff'); // Reset background color to white
    } else {
      setBgColor('#32CD32'); // Set background to lime green
    }
  };

  return (
    <View style={[styles.itemContainer, { backgroundColor: bgColor }]}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.line} />
      <Text style={styles.details}>{item.details}</Text>
      <Text style={styles.details}>{item.destination}</Text>
      <Text style={styles.details}>{item.timeAway}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Button 1 - Navigate to Chat Screen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Chat')}
        >
          <Icon name="envelope" size={24} color="#fff" />
        </TouchableOpacity>
        
        {/* Button 2 - Toggle background color */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleStarPress}
        >
          <Icon name="star" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Button 3 - Reorder */}
        <TouchableOpacity style={styles.button} onPress={onReorder}>
          <Text style={styles.buttonText}>Reorder</Text>
        </TouchableOpacity>

        {/* Button 4 - View Receipt */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Receipt')}
        >
          <Text style={styles.buttonText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginBottom: 0,
    borderRadius: 8,
    borderColor: '#4b3ae0', 
    borderWidth: 2,
    borderTopColor: '#4b3ae0',  
    borderTopWidth: 7,          
  },
  name: {
    color: '#4b3ae0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#4b3ae0',
  },
  line: {
    marginTop: 1,
    height: 1, 
    backgroundColor: '#4b3ae0',  
    marginVertical: 8, 
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#4b3ae0',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SectionItem;
