import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Movie = {
  id: number;
  title: string;
  genre: string;
  description: string;
  image: string;
};

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const fetchFavoritesFromStorage = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('Preferiti');
      const favorites: Movie[] = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favorites);
    } catch (error) {
      console.error('Error fetching favorites from storage:', error);
    }
  };

  const saveFavoritesToStorage = async (updatedFavorites: Movie[]) => {
    try {
      const favoritesString = JSON.stringify(updatedFavorites);
      await AsyncStorage.setItem('Preferiti', favoritesString);
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  };

  const removeFromFavorites = (movieId: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    saveFavoritesToStorage(updatedFavorites);
  };

  useEffect(() => {
    fetchFavoritesFromStorage();
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <View key={movie.id} style={styles.movieContainer}>
            <Image source={{ uri: movie.image }} style={styles.image} />
            <View style={styles.movieInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.genre}>{movie.genre}</Text>
              <Text style={styles.description}>{movie.description}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromFavorites(movie.id)}>
              <Text style={styles.remove}>Rimuovi dai preferiti</Text>
            </TouchableOpacity>
          </View>
          
        ))
      ) : (
        <Text style= {styles.nessunFilmPreferito}>Nessun film preferito</Text>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 16,
    flexDirection: 'column',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#00CECB',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  movieContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
      width: 200,
      height: 250,
      resizeMode: 'cover',
      borderRadius: 8,
      marginBottom: 8,
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      objectFit: 'cover',
  },
  movieInfo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  genre: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'justify',
  },
  remove:{
    marginLeft: 8,
    backgroundColor: '#FF8A5B',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  nessunFilmPreferito:{
    color: 'white',
    fontWeight: 'bold',
  }
});

export default FavoritesScreen;