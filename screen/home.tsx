import { SafeAreaView, StyleSheet, Text, View,   Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import { Colors } from '../constants/Colors';
import AllTopTab from './AllTopTab';
import UrgentTopTab from './UrgentTopTab';

const { width: dwidth } = Dimensions.get("window");

const Homee = () => {
  const [screen, setScreen] = useState(1);
  const styles = StyleSheet.create({
    
    textmenu: {
     fontSize:15,
     fontWeight:'500'

    },
    text: {
      display:'flex',
      flexDirection:'column',
      paddingTop:30,
    },
    hello: {
      color:Colors.gray,
      fontSize:15,
      fontWeight:'500',
      paddingBottom:10
    
    },
    disc: {
      color:'black',
      fontSize:23,
      fontWeight:'700'
    },
    notifi: {
      paddingLeft:90
    
    },
    
      container:{
        
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:10,
        marginRight:10,
        marginBottom:30,
        
      },
      tabStyles: {
        width: Number(((dwidth ) / 2).toFixed(0)),
        paddingVertical: 5,
        paddingHorizontal: 7,
      alignItems:'center'
        
        
      },
  
    // Active tab indicator style
    activeTabIndicator: {
      // Adjust the height as needed

      borderBottomWidth: 3, // Adjust the width as needed
    borderBottomColor: 'orange', // Set the color to red
      
    },
  });
  return (
    <SafeAreaView >
      <StatusBar/>
      <View style={styles.container}>
        <View style={styles.text}>
          <View >
            <Text style={styles.hello}>Welcome To Pets Bank</Text>
          </View>
          <View >
            <Text style={styles.disc}>Find Your Lovely Pet</Text>
          </View>
        </View>
         <View style={styles.notifi}>
         <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
      <View>
        
        
      </View> 
      </View>
      <ScrollView>
      <View style={{ width: "100%", flex: 1 }}>
      <View style={{ width: "100%", flex: 0.2, backgroundColor: "black" }} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 7,
          paddingHorizontal: 7,
        }}
      >
        <TouchableOpacity  style={[
    styles.tabStyles,
    screen === 1 ? styles.activeTabIndicator : null,
  ]}
  onPress={() => setScreen(1)}>
          <Text style={styles.textmenu}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[
    styles.tabStyles,
    screen === 2 ? styles.activeTabIndicator : null,
  ]}
  onPress={() => setScreen(2)}>
          <Text style={styles.textmenu}>Urgent</Text>
        </TouchableOpacity>
        
      </View>
      {screen === 1 ? (
        <AllTopTab />
      ) : screen === 2 ? (
        <UrgentTopTab />
      )  : null}
    </View>
        
      

        
        </ScrollView>
    </SafeAreaView>
  )
}

export default Homee

