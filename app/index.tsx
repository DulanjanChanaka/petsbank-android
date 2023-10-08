import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from '../navigation/StackNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {


  const [appIsReady, setAppIsReady] = useState(true);

  const onLayoutRootView = async () => {
    if (appIsReady) {
      
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  }


  return (
    <View style={{flex:1}} onLayout={onLayoutRootView}>
    <StackNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});

