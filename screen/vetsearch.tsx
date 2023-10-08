import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import PostFree from '../components/addclinic'; // Import the PostFree component
import { StyleSheet } from 'react-native';
import VetSearchClinic from '../components/vetsearchclinic';

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.button}>
      <Button title="Register Your Clinic Center" onPress={handleOpenModal}  />

      </View>
      <View>
        <VetSearchClinic/>
      </View>
      
      

      {/* Render the PostFree component as a modal */}
      <PostFree visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  button:{

    marginTop:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
  }
})

export default HomePage;
