// Navbar.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Genre: { genre: string };
};

type NavigationProps = NavigationProp<RootStackParamList>;

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const goToHome = () => {
    navigation.navigate('Home' as never)
  };

  const goToAnimation = () => {
    setDropdownOpen(false);
    navigation.navigate('Animazione' as never);
  };
  const goToAdventure = () => {
    setDropdownOpen(false);
    navigation.navigate('Avventura' as never);
  };
  const goToDrama = () => {
    setDropdownOpen(false);
    navigation.navigate('Drammatico' as never);
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.logoContainer}>
        {/* Inserisci qui il tuo logo */}
        <MaterialIcons name="local-movies" size={24} color="black" />
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={goToHome}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity onPress={toggleDropdown}>
            <Text style={styles.link}>Generi</Text>
          </TouchableOpacity>
          {dropdownOpen && (
            <View style={styles.dropdownContent}>
              <TouchableOpacity onPress={goToAnimation}>
                <Text style={styles.dropdownItem}>Animazione</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToAdventure}>
                <Text style={styles.dropdownItem}>Avventura</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToDrama}>
                <Text style={styles.dropdownItem}>Drammatico</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#FFED66',
    
    zIndex: 2,
  },
  logoContainer: {
    marginRight: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    marginRight: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownContainer: {
    position: 'relative',
    
  },
  dropdownContent: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#FFED66',
    padding: 8,
    borderRadius: 4,
    elevation: 4,
    width: 120,
   
  },
  dropdownItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
});

export default Navbar;
