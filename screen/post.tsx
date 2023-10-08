import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import AllTopTab from './AllTopTab';

import TopTab from '../components/TopTab'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '../constants/Colors';
import PostFree from './postfree';
import SellPetAdd from '../components/sellpetadd';

const { width: dwidth } = Dimensions.get("window");
const Post = () => {
  const [screen, setScreen] = useState(1);
  const styles = StyleSheet.create({
    // ... Your existing styles ...
    textmenu: {
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      fontSize:18,
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
          <Text style={styles.textmenu}>Street Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[
    styles.tabStyles,
    screen === 2 ? styles.activeTabIndicator : null,
  ]}
  onPress={() => setScreen(2)}>
          <Text style={styles.textmenu}>Sell Pets</Text>
        </TouchableOpacity>
        
      </View>
      {screen === 1 ? (
        <PostFree/>
      ) : screen === 2 ? (
        <SellPetAdd />
      )  : null}
    </View>
        
      

        
        </ScrollView>
    </SafeAreaView>)
}

export default Post

const styles = StyleSheet.create({})