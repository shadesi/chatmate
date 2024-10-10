import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Start = () => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const navigation = useNavigation();

  const backgroundColors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <ImageBackground 
      source={require('../assets/background-image.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>ChatMate</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder='Your Name'
          placeholderTextColor='#000000'
        />
        
        <Text style={styles.colorText}>Choose Background Color:</Text>
        
        <View style={styles.colorSelector}>
          {backgroundColors.map((color) => (
            <TouchableOpacity 
              key={color} 
              style={[styles.colorOption, { backgroundColor: color }]}
              onPress={() => setBgColor(color)}
            />
          ))}
        </View>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#757083' }]}
          onPress={() => navigation.navigate('Chat', { name, bgColor })}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '88%',
    borderColor: '#757083',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
    color: '#757083',
  },
  colorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    padding: 15,
    width: '88%',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
