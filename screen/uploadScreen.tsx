import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase/firebase'; // Import Firebase storage here

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.uri };
      setImage(source);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please select an image before uploading.');
      return;
    }

    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();

    // Use a reference to Firebase Storage
    const storageRef = ref(storage, '' + Date.now()); // You can adjust the path as needed

    try {
      // Upload the blob to the storageReference
      await uploadBytesResumable(storageRef, blob).then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUploading(false);
          Alert.alert('Photo uploaded!');
          setImage(null);
        });
      });
    } catch (error) {
      console.error('Error uploading image: ', error);
      setUploading(false);
      Alert.alert('Error uploading image', 'An error occurred while uploading the image.');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>

      <TouchableOpacity style={styles.image} onPress={pickImage}>
        <Text style={styles.imagetext}>Choose Image</Text>
      </TouchableOpacity>
      <View>
        
        <TouchableOpacity style={styles.upload} onPress={uploadImage}>
          <Text style={styles.imagetext}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      

      </View >
      <View style={styles.preview}>
      {image && <Image source={image} style={{ width: 200, height: 200 }} />}

      </View>
      
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
image: {
  
  backgroundColor:'gray',
  width: 120,
  borderRadius:10,
  height:40,
  alignItems:'center',
  justifyContent:'center'

},
imagetext: {
  
  textAlign:'center',
  color:'white',
  fontSize:15,
  fontWeight:'500'
  
},
upload: {
  backgroundColor:'gray',
  width: 120,
  borderRadius:10,
  height:40,
  alignItems:'center',
  justifyContent:'center'
},
preview: {
  marginTop:20,
  marginBottom:20,
  display:'flex',
    flexDirection:'row',
    justifyContent:'center'

}
})

export default UploadScreen;
