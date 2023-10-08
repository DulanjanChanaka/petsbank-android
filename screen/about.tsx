import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import { db } from '../firebase/firebase'; // Make sure this import is correct
import { addDoc, collection } from 'firebase/firestore';
import { Colors } from '../constants/Colors';

const About = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      // Add the contact data to a Firebase collection
      const docRef = await addDoc(collection(db, 'contact'), {
        name,
        email,
        message,
      });

      console.log('Contact added to Firebase collection with ID: ', docRef.id);

      // Clear the form fields after submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error adding contact to Firebase collection: ', error);
    }
  };

  return (
    <View >
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headertext}>Contact Us</Text>
      </View>
      <View style={styles.container}>
      <Text style={styles.messageform}>Get In Touch</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.message}
        placeholder="Message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline={true}
          numberOfLines={4}
      />
      
      <TouchableOpacity style={{backgroundColor:Colors.secondary , paddingVertical:15 , paddingHorizontal:20, borderRadius:20}} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

    
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius:20,
    
  },
  message: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius:20,
  },
  messageform:{
    fontSize: 18,
    marginBottom: 20,
  }, headertext:{
    fontSize: 24,
    fontWeight:'600'

  },
  buttonText:{
    color:'white',
    fontSize:15,
    fontWeight:'500'
  }
});

export default About;
