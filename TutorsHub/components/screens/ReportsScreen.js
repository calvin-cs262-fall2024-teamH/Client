// yigit turan add here for screen of reports page

import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import SectionItem from '../components/SectionItem';
import SectionHeader from '../components/SectionHeader';

const DATA = [
  { // it is not complated 
    title: 'Section 0', // section 0 means map of the tutior ( like closes uber driver screen)
    data: [''] // Empty section as requested
  },
  {
    // tuitors , data and informations (last reports)
    title: 'Section 1',
    data: [
      { name: 'Rock Lee', details: 'Saturday, Sep 28 - $10.99 - 1 hr' },
      { name: 'Ben Tennyson', details: 'Saturday, Sep 28 - $10.99 - 1 hr' },
      { name: 'Mai Nguyen', details: 'Saturday, Sep 28 - $10.99 - 1 hr' }
    ]
  }
];

const ReportsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports</Text>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          typeof item === 'object' ? <SectionItem item={item} /> : null
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
      />
    </View>
  );
};

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
});

export default ReportsScreen;