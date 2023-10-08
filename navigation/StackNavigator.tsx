import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Homee from '../screen/home'

import Post from '../screen/post';
import Shop from '../screen/shop';

import Search from '../screen/search';

import About from '../screen/about';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();



  return (
    <Tab.Navigator

    >
      <Tab.Screen
        name="Home"
        component={Homee}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#FF6000" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="search" size={24} color="#FF6000" />
            ) : (
              <AntDesign name="search1" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarLabel: 'Post',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="add-circle-sharp" size={24} color="#FF6000" />
            ) : (
              <Ionicons name="add-circle-outline" size={34} color={'black'} />
            ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarLabel: 'Shop',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="shopping" size={24} color="#FF6000" />
            ) : (
              <Feather name="shopping-bag" size={24} color={'black'} />
            ),
        }}
      />

      <Tab.Screen
        name="Contact Us"
        component={About}
        options={{
          tabBarLabel: 'Contact Us',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#FF6000" />
            ) : (
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1ECC8',
  },
  // Other styles as needed
});
