// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    View, 
    Text, 
    SafeAreaView,
    FlatList,
    StyleSheet,
    RefreshControl,
    ScrollView,
    StatusBar,
    Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
const HomeScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [animating, setAnimating] = useState(true);
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false);
    const [userdetails, setUserdetails] = useState([]);
    const [avtar, setAvtar] = useState('https://i.imgur.com/fHyEMsl.jpg');
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const loadUserData = async () => {        
        setLoading(false); 
        let token =  await AsyncStorage.getItem('token');
        await fetch('https://www.bearandbulls.com/api/dashboard',{
            method: 'GET',
            headers: {
                'authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {            
            setUserdetails(responseJson.data);
            setRefreshing(false);
            wait(200).then(() => setLoading(true))
        })
        .catch((error) => {
            console.error(error);
        });
    };  
    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            loadUserData(); 
        }, 1000); 
    }, []);
  return (  


    <SafeAreaView style={styles.safearea}>
        {refreshing ? <ActivityIndicator /> : null}
        <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={loadUserData}
              />
            }
        >
            <View style={styles.topview}>
                <View style={styles.avtardiv} >
                    <View style={styles.avtardiv} >            
                        { loading &&  <Image style={styles.avtar}
                              source={{
                                uri: userdetails.user_details.avatar,
                              }}
                            />
                        } 
                    </View>
                </View>
                <View style={styles.detailsdiv} >
                    {loading && <Text style={styles.baseText}>
                            <Text style={styles.titleText} >
                                {userdetails.user_details.refcode}
                            </Text> 
                            {"\n"}
                            <Text style={styles.titleText} >
                                {userdetails.user_details.name}
                            </Text> 
                            {"\n"} 
                            <Text style={styles.titleText} >
                                {userdetails.user_details.email}
                            </Text>
                            {"\n"}
                            <Text style={styles.titleText} >
                                {userdetails.user_details.phone}
                            </Text> 
                            {"\n"}
                            <Text style={styles.titleText} >
                                Member Since : {userdetails.user_details.member_since}
                            </Text>  
                            {"\n"}
                            {userdetails.user_details.profile_verify== 1 && 
                                <Text style={{color:'green',backgroundColor: '#FFFFFF',padding:5}}> Verified</Text>
                            }               
                            {userdetails.user_details.profile_verify == 0 && 
                                <Text style={{color:'red',backgroundColor: '#FFFFFF',padding:5}}> Unverified</Text>
                            }    

                        </Text>
                    } 
                </View>
            </View>
            <View style={styles.slotsDiv}>
                <View style={{width:'90%'}} >                                                
                    {loading && <Text style={styles.titleText} >
                            {userdetails.enrolled_message}
                        </Text> 
                    }
                </View>                    
                <View style={{width:'10%'}} >      
                    <Icon style={{ fontWeight: 'bold' }} name="trophy" size={30} color="#900" />                
                </View>
            </View>
            <View style={styles.slotsDiv}>
                <View style={{width:'90%'}} >                                                
                    <Text style={{fontSize: 16,fontWeight: '500'}} >Total Slots</Text> 
                </View>                    
                <View style={{width:'10%'}} >      
                    <Icon name="plus-circle" size={30}  />                
                </View>
            </View>           
            
        </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
    topview: {
        margin: 10,
        backgroundColor: "#e51b00cc",
        flex: 1,
        flexDirection:'row',
        gap: '2rem',
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:15,
        height:150
    },
    row: {
        flex: 1,
        flexDirection:'row',
        flexWrap: "wrap",
        borderRadius:15
    },
    slotsDiv: {
        flex: 1,
        flexDirection:'row',
        flexWrap: "wrap",
        padding:15
    },
    avtardiv: {
      width: "25%",
      height: 120,
      paddingTop:7,
    },

    avtar:{
        width: 90,
        height: 90,
        borderRadius: 100,
        
    },
    detailsdiv: {
        width: "70%",
        height: 120,
        padding:10,
    },

    enrolledView: {
      width: "100%",
      height: 80,
      padding:10,
    },
    
    
});

export default HomeScreen;
