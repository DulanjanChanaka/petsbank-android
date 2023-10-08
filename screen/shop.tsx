import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const Shop = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPostsCollection = await getDocs(collection(db, 'petsell'));
        const userPostsData = userPostsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPosts(userPostsData);
      } catch (error) {
        console.error('Error fetching userposts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     style={styles.card}
  //     onPress={() => {
  //       setSelectedPost(item);
  //       setModalVisible(true);
  //     }}
  //   >
  //     <Text style={styles.title}>{item.place}</Text>
  //     {item.imagelink && (
  //       <Image source={{ uri: item.imagelink }} style={styles.image} />
  //     )}
  //     <Text style={styles.description}>{item.contact}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <ScrollView style={styles.container}>
      <View style={{ width:'100%', height:50, }}>
      <Text style={{fontSize:20 , textAlign:'center', fontWeight:'600'}}>Buy Your Own Pet</Text>

      </View>
      
      <View style={styles.cardContainer}>
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
            {item.imagelink && (
              <Image source={{ uri: item.imagelink }} style={styles.image} />
            )}
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPost?.place}</Text>
            {selectedPost?.imagelink && (
              <Image source={{ uri: selectedPost?.imagelink }} style={styles.modalImage} />
            )}
            <Text style={styles.modalDescription}>Location :    {selectedPost?.location}</Text>
            <Text style={styles.modalDescription}>Price :    {selectedPost?.price}</Text>
            <Text style={styles.modalDescription}>Description :    {selectedPost?.description}</Text>
            <Text style={styles.modalDescription}>Seller Contact :    {selectedPost?.contact}</Text>
            <Text style={styles.modalDescription}>Seller Name :    {selectedPost?.name}</Text>

            {/* You can add more details here */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0', // Set background color to a light gray
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  card: {
    width: '48%', // Set the card width to occupy 48% of the screen width
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    fontWeight:'500',
    marginBottom:10
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
  headertext:{
    
    backgroundColor:'red'
  }
});

export default Shop;
