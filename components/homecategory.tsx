import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
const Homecategory = ({ list } ) => {
    
  return (
    <FlatList
    
      data={list}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => {
        return (
          <TouchableOpacity  style={{marginLeft:10, marginTop:20, }}>
            <View style={styles.card}>
              
              <Text style={styles.text}>{item.title} </Text>
              
            </View>
          </TouchableOpacity>
          
        );
        
      }}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
    card:{
        width:100,
        height:40,
        display:'flex',
        flexDirection:'row',
        backgroundColor:Colors.primary,
        justifyContent:'space-around',
        textAlign:'center',
        alignItems:'center',
        borderRadius:20, 
         
        
      
        
        
        
    },
    text: {
        fontSize:15,
        fontWeight:'400'
    },


});


export default Homecategory;
