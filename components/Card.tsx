import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type Movie = {
  id: number;
  title: string;
  genre: string;
  description: string;
  image: string;
};
type RootStackParamList = {
  MovieDetails: { movie: Movie };
  // Altre schermate della tua app
};

type MovieDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;


const Card = ({ movie }: { movie: Movie }) => {
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();

  const handlePress = () => {
    // Naviga verso la pagina dei dettagli del film e passa i dati del film come parametro
    navigation.navigate('MovieDetails', { movie });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <ScrollView>
        <Image source={{ uri: movie.image }} style={styles.image} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.genre}>{movie.genre}</Text>
      </ScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    flexDirection: 'row',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  genre: {
    fontSize: 16,
    
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'justify',
  },
});

export default Card;
