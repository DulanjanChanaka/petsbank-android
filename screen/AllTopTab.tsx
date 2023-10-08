import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '../components/card';

const AllTopTab = () => {



  return (
    <View style={styles.container}>
      <Card/>
    </View>
  )
}

export default AllTopTab

const styles = StyleSheet.create({
  container: {
    marginTop:20
  }
})