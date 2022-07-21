// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView,StyleSheet} from 'react-native';

const SettingsScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.square_one} />
        <View style={styles.square_two} />
        
        <View style={styles.square_three} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
      </View>

      <View style={styles.container_two}>
        <View style={styles.square_one} />
        <View style={styles.square_two} />
        
        <View style={styles.square_three} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CA1B4",
    flex: 1,
    flexDirection:'row',
    gap: '1rem',
    flexWrap: "wrap",
  },
  container_two: {
    backgroundColor: "#7CA1B4",
    flex: 1,
    flexDirection:'row',
    gap: '1rem',
    flexWrap: "wrap",
  },
  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 4,
  },
  square_one: {
    backgroundColor: "#7cb48f",
    width: "25%",
    height: 100,
    margin: 4,
  },square_two: {
    backgroundColor: "#7cb48f",
    width: "70%",
    height: 100,
    margin: 4,
  },square_three: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 4,
  },

});
export default SettingsScreen;
