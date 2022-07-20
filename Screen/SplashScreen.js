// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  async function autologin() {
      let token =  await AsyncStorage.getItem('token');
      console.log("SplashScreen token")
      console.log(token)
      const response = await fetch('https://www.bearandbulls.com/api/autologin',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'authorization': 'Bearer '+ token,
          }
      });
      const responseJson = await response.json();       
      if (responseJson.status == 1) {          
          navigation.replace('DrawerNavigationRoutes');
      } else {
        navigation.replace('Auth');
      }
  }


  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      autologin()      
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/SplashScreen.png')}
        style={{height: '100%',width: '100%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
