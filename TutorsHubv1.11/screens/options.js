import React from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';

function OptionsScreen() {
  return (
	<View style={styles.container}>
		<Image source = {require('../assets/logoBlack.png')} style = {styles.logoImage} />
		<Text style={styles.text}>Options Screen</Text>
	</View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	logoImage: {
		width: 50,
		height: 40,
		position: 'absolute',
		top: 0,
		left: 0,
		marginLeft: 7,
		marginTop: 7,
	},

});

export default OptionsScreen;