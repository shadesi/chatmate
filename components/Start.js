import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, 
  TouchableOpacity, ImageBackground, KeyboardAvoidingView, 
  Platform, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const backgroundColors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  const auth = getAuth();

  const onStartChatting = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { 
          userID: result.user.uid,
          name: name || 'Anonymous',
          bgColor: bgColor 
        });
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to sign in anonymously.");
        console.error(error);
      });
  }

  return (
    <ImageBackground 
      source={require('../assets/background-image.png')} 
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome to ChatMate</Text>
          
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder='Your Name'
            placeholderTextColor='#757083'
          />
          
          <Text style={styles.colorText}>Choose Background Color:</Text>
          
          <View style={styles.colorSelector}>
            {backgroundColors.map((color) => (
              <TouchableOpacity 
                key={color} 
                style={[styles.colorOption, { backgroundColor: color }, bgColor === color && styles.selectedColor]}
                onPress={() => setBgColor(color)}
              />
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={onStartChatting}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
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
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
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
  selectedColor: {
    borderWidth: 2,
    borderColor: '#757083',
  },
  button: {
    backgroundColor: '#757083',
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