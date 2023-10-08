import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Petsearch from '../screen/petsearch';
import Vetsearch from '../screen/vetsearch';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator

    >
      <Tab.Screen name="Pet Search" component={Petsearch} />
      <Tab.Screen name="Vet Clinic" component={Vetsearch} />
    </Tab.Navigator>
  );
};

export default TopTab;


