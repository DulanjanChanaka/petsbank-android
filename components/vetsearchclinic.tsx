import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';


const Petsearch = () => {
  const dataCollection = collection(db, 'vetclinic');
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchDataByFirstLetter = async (letter) => {
    const q = query(
      dataCollection,
      where('location', '>=', letter),
      where('location', '<', letter + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const handleSearch = (text) => {
    setSearchName(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchName) {
        const result = await searchDataByFirstLetter(searchName);
        setSearchResult(result);
      } else {
        setSearchResult([]);
      }
    };

    fetchData();
  }, [searchName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Vet Clinic</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Find Area"
          value={searchName}
          onChangeText={handleSearch}
        />
        {searchResult.length > 0 ? (
          <ScrollView style={styles.card}>
            {searchResult.map((item) => (
              <View key={item.id} style={styles.cardItem}>
                <Text style={styles.dname}>{item.name}</Text>
                <Text style={styles.bn}>{item.contact}</Text>
                <Text style={styles.pn}>{item.location}</Text>
                <Text style={styles.pn}>{item.description}</Text>
                <Text style={styles.pn}>{item.district}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
         
            <View>
                
            </View>
          
          
        )}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  card: {
    marginTop: 16,
  },
  cardItem: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  dname: {
    fontWeight: 'bold',
  },
  bn: {
    color: 'blue',
  },
  pn: {
    color: 'green',
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 8,
  },
});

export default Petsearch;
