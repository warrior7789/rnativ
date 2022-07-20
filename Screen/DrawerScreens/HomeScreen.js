// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator,View, Text, SafeAreaView,FlatList,StyleSheet,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {
    const [animating, setAnimating] = useState(true);
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false);
    const [userdetails, setUserdetails] = useState([]);
    const [avtar, setAvtar] = useState('https://i.imgur.com/fHyEMsl.jpg');
     
    async function getKind() {    
        let token =  await AsyncStorage.getItem('token');
        console.log("test")
        console.log(token)
        
        const response = await fetch('https://www.bearandbulls.com/api/dashboard',{
            method: 'GET',
            headers: {
                'authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        });
        const responseJson = await response.json(); 
        console.log(responseJson)
        setUserdetails(responseJson.data);
        setImageUrl(responseJson.data.user_details.avatar);
        
        console.log(userdetails)
        
               
    }
  
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      getKind(); 
    }, 5000);
       

  }, []);
  return (    
    <View style={styles.container}> 
        <View style={styles.topview} >
            <View style={{ padding: 5, height: '20%',width: '30%'}} >            
                { imageUrl &&  <Image style={styles.avtar}
                      source={{
                        uri: userdetails.user_details.avatar,
                      }}
                    />
                } 
            </View>
            <View style={{padding: 5, width: '70%',alignSelf: 'flex-end'}} > 
                {userdetails.user_details && <Text style={styles.baseText}>
                      <Text style={styles.titleText} >
                        {userdetails.user_details.refcode}
                      </Text> 
                      {"\n"}
                      <Text style={styles.titleText} >
                        {userdetails.user_details.name}
                      </Text>                      
                    </Text>
                } 
            </View>

            

        </View>
        <View style={{
            width: '66%', height: '35%', backgroundColor: 'skyblue'
        }} />
        <View style={{
            width: '33%', height: '50%', backgroundColor: 'steelblue'
        }} />           
        

                 
    
    <ActivityIndicator
      animating={animating}
      color="#FFFFFF"
      size="large"
      style={styles.activityIndicator}
    />
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,

    },
    avtar: {
        width: 100,
        height: 100,
        padding: 20,
        borderRadius: 100,

    },

    titleText: {
        fontSize: 12,
        fontWeight: "bold"
    },

    topview:{
        padding: 10,
        height: '20%', 
        width: '100%',
        backgroundColor: '#e51b00cc'
    }
});

export default HomeScreen;
