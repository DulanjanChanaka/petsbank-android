import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const VetAll = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPostsCollection = await getDocs(collection(db, 'vetclinic')); // Replace 'vetclinic' with your collection name
        const userPostsData = userPostsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPosts(userPostsData);
      } catch (error) {
        console.error('Error fetching vet clinic posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  const styles = StyleSheet.create({
    // ... (other styles remain the same)

    modalDescription: {
      fontSize: 16,
    },
    closeButton: {
      backgroundColor: 'lightgray',
      borderRadius: 4,
      padding: 8,
      alignSelf: 'flex-end',
      marginTop: 10,
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <ScrollView >
      <View >
        {userPosts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => {
              setSelectedPost(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.title}>{item.location}</Text> 
           
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View >
          <View >
            <Text style={styles.modalTitle}>{selectedPost?.location}</Text> {/* Replace 'place' with 'location' */}
            
            <Text style={styles.modalDescription}>{selectedPost?.contact}</Text> {/* Replace 'contact' */}
            <Text style={styles.modalDescription}>{selectedPost?.description}</Text> {/* Replace 'description' */}
            <Text style={styles.modalDescription}>{selectedPost?.destrict}</Text> {/* Replace 'destrict' */}
            <Text style={styles.modalDescription}>{selectedPost?.name}</Text> {/* Replace 'name' */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default VetAll;
