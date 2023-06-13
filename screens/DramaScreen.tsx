import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import axios from 'axios';

import Card from '../components/Card';

const DramaScreen = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/movies/genre/Drammatico');
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {movies.map(movie => (
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
  }
  
});

export default DramaScreen;

