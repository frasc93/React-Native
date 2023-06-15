import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  MovieDetails: { movie: Movie };
};

type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

type Props = {
  route: MovieDetailsRouteProp;
};

type Movie = {
  id: number;
  title: string;
  genre: string;
  description: string;
  image: string;
};

const MovieDetails: React.FC<Props> = ({ route }) => {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavoriteStatus();
  }, []);

  const fetchFavoriteStatus = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('Preferiti');
      const favorites: Movie[] = favoritesString ? JSON.parse(favoritesString) : [];
      const foundMovie = favorites.find((favMovie) => favMovie.id === movie.id);

      setIsFavorite(!!foundMovie);
    } catch (error) {
      console.error('Error fetching favorites from storage:', error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('Preferiti');
      let favorites: Movie[] = favoritesString ? JSON.parse(favoritesString) : [];
      const foundMovieIndex = favorites.findIndex((favMovie) => favMovie.id === movie.id);

      if (foundMovieIndex !== -1) {
        favorites.splice(foundMovieIndex, 1);
        setIsFavorite(false);
      } else {
        favorites.push(movie);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem('Preferiti', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const handleNavigateToFavorites = () => {
    navigation.navigate('Preferiti' as never);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: movie.image }} style={styles.image} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.genre}>{movie.genre}</Text>
        <Text style={styles.description}>{movie.description}</Text>

        <TouchableOpacity style={styles.heartButton} onPress={handleToggleFavorite}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleNavigateToFavorites}>
          <Text style={styles.favoriteButtonText}>Vai ai Preferiti</Text>
        </TouchableOpacity>
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
  favoriteButton: {
    backgroundColor: '#FF8A5B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  heartButton: {
    marginBottom: 10,
  },
});

export default MovieDetails;
