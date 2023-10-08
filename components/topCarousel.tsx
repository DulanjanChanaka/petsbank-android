import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';

const TopCarousel = ({ list } ) => {
    
  return (
    <FlatList
      data={list}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={{marginLeft:10, marginTop:20}}>
            <View style={styles.card}>
              <View >
                <Image source={item.image} style={styles.image}  />
              </View>
              <Text>{item.title}</Text>
              
            </View>
          </TouchableOpacity>
          
        );
        
      }}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default TopCarousel;

const styles = StyleSheet.create({
    card:{
        width:350,
        height:200,
        
    },
    image:{
        width:350,
        height:200,
        resizeMode:"cover",
        borderRadius:20

    }


});
