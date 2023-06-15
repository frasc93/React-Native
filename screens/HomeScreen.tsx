import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Card from '../components/Card';
import MovieDetailsScreen from './MovieDetailsScreen';

const HomeScreen = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.7:3000/v1/movies/allmovies');
        setMovies(response.data);
        setFilteredMovies(response.data); // Inizialmente visualizza tutti i film
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // ricerca input per titolo
  const handleSearchButtonPress = () => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(movies); // Ripristina l'elenco completo dei film
    } else {
      const filtered = movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredMovies(filtered);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies App</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ricerca per titolo"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearchButtonPress} 
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFEA',
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF8A5B',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#FF8A5B',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
