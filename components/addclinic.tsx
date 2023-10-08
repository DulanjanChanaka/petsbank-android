import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Modal } from 'react-native';
import { db } from '../firebase/firebase'; // Import your Firebase configuration here
import { addDoc, collection } from 'firebase/firestore';


const AddClinic = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  const handleFormSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'vetclinic'), {
        name: name,
        location: location,
        district: district,
        description: description,
        contact: contact,
      });
      console.log('Document written with ID: ', docRef.id);
      // Reset form fields
      setName('');
      setLocation('');
      setDistrict('');
      setDescription('');
      setContact('');
      onClose(); // Close the modal
      Alert.alert('Success', 'Form submitted successfully.');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container1}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter clinic name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter clinic location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />

        <Text style={styles.label}>District:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter clinic district"
          value={district}
          onChangeText={(text) => setDistrict(text)}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter clinic description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Text style={styles.label}>Contact Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter clinic contact number"
          value={contact}
          onChangeText={(text) => setContact(text)}
          keyboardType="phone-pad"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddClinic;
