import React from 'react';
import { View, Text, SectionList, StyleSheet,Image } from 'react-native';
import SectionItem from '../components/SectionItem';
import SectionHeader from '../components/SectionHeader';

// Dummy data for SectionList
const DATA = [
  {
    //title: 'Section 0',
    data: [
        { name: 'Clive Amoh', destination: 'New York City', timeAway: '3 days' },
          
    ] 
  },
  {
    //title: 'Section 1',
    data: [
      { name: 'Rock Lee', details: 'Saturday, Sep 28 - $10.99 - 1 hr' },
      { name: 'Ben Tennyson', details: 'Saturday, Sep 28 - $10.99 - 1 hr' },
      { name: 'Mai Nguyen', details: 'Saturday, Sep 28 - $10.99 - 1 hr' }
    ]
  }
];

// Reports Screen
const ReportsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports</Text>
      <Image source = {require('../assets/logoBlack.png')} style = {styles.logoImage} />

      <View style={styles.line} />
      <SectionList
        sections={DATA} // i do not understand that error , it works good
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <SectionItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  line: {
    marginTop: 10,
    height: 7,
    backgroundColor: '#4b3ae0',
    marginBottom: 10,
  },
  logoImage: {
    width: 50,
    height: 40,
    alignSelf: 'left',
    marginLeft: 7,
    marginTop: -50,
  },

});

export default ReportsScreen;


