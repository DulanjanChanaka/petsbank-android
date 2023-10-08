import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../firebase/firebase'; 
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { Entypo } from '@expo/vector-icons';
const SellPetAdd = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [imagelink, setImagelink] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [dogtype, setDogType] = useState('normal');
  const [formError, setFormError] = useState('');
 



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
    const storageRef = ref(storage, '/petsell' + Date.now()); // You can adjust the path as needed

    try {
      // Upload the blob to the storageReference
      await uploadBytesResumable(storageRef, blob).then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUploading(false);
          Alert.alert('Photo uploaded!');
          
          setImagelink(downloadURL);
        });
      });
    } catch (error) {
      console.error('Error uploading image: ', error);
      setUploading(false);
      Alert.alert('Error uploading image', 'An error occurred while uploading the image.');
    }
  };


  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !contact || !imagelink || !description || !price) {
      setFormError('All fields are required.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'petsell'), {
      name: name,
      location:location,
      dogtype: dogtype,
      contact: contact,
      imagelink: imagelink,
      price:price,
      description:description,


      });
      console.log('Document written with ID: ', docRef.id);
      // Reset form fields

      setName('');
      setLocation('');
      setDogType('');
      setContact('');
      setImagelink('');
      setPrice('');
      setDescription('');

      
    } catch (error) {
      console.error('Error adding document: ', error);
    }
 
    if (imagelink) {
      console.log('Image Link:', imagelink);
      // You can include the imagelink in your form submission or any other data processing here
    } else {
      console.log('No image uploaded');
      // Handle the case where no image is uploaded, if needed
    }
    setImage(null);

    Alert.alert('Success', 'Form submitted successfully.');
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your place"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      
      

      <Text style={styles.label}>Contact Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your contact number"
        value={contact}
        onChangeText={(text) => setContact(text)}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your contact number"
        value={description}
        onChangeText={(text) => setDescription(text)}
        
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your contact number"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="phone-pad"
      />

<View style={styles.container}>

<TouchableOpacity style={styles.image} onPress={pickImage}>
  <Text style={styles.imagetext}>Choose Image</Text>
</TouchableOpacity>

  
  <Entypo name="arrow-long-right" size={34} color="black" />
  
  
  <TouchableOpacity style={styles.upload} onPress={uploadImage}>
    <Text style={styles.imagetext}>Upload Image</Text>
  </TouchableOpacity>




</View >
<View style={styles.preview}>
{image && <Image source={image} style={{ width: 200, height: 200 }} />}

</View>

{formError ? <Text style={styles.errorText}>{formError}</Text> : null}

      {uploading && <ActivityIndicator size="large" color="#007BFF" />}




      <Button title="Submit" onPress={handleFormSubmit} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },

  chooseImageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  chooseImageText: {
    color: 'white',
    fontWeight: 'bold',
  },
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

});

export default SellPetAdd;


