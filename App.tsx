// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AnimationScreen from './screens/AnimationScreen';
import AdventureScreen from './screens/AdventureScreen';
import DramaScreen from './screens/DramaScreen';
import Navbar from './components/Navbar';
import { View, StyleSheet } from 'react-native';
import MovieDetails from './screens/MovieDetailsScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
    <NavigationContainer>
       <Navbar /> 
       <View style={styles.content}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Animazione" component={AnimationScreen}  />
        <Stack.Screen name="Avventura" component={AdventureScreen}  />
        <Stack.Screen name="Drammatico" component={DramaScreen}  />
        <Stack.Screen name="MovieDetails" component={MovieDetails as React.ComponentType<any>} />

      </Stack.Navigator>
      </View>
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 0,
    
  },
});

export default App;
