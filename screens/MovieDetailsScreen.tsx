import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

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

  return (
    <View style={styles.container}>
       
      <Image source={{ uri: movie.image }} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.genre}>{movie.genre}</Text>
      <Text style={styles.description}>{movie.description}</Text>
     
    </View>
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
    alignConent: 'center',
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
});

export default MovieDetails;
