import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRsSi9XqwnPQ5BmiFb-9RJeJ5b7rRWLg8",
  authDomain: "chatmate-68201.firebaseapp.com",
  projectId: "chatmate-68201",
  storageBucket: "chatmate-68201.appspot.com",
  messagingSenderId: "688349826679",
  appId: "1:688349826679:web:e0d7991b07e664ef74c072"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

const App = () => {
  // Get network connection status
  const connectionStatus = useNetInfo();
  
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      disableNetwork(db);
      console.log('Offline mode activated');
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
      console.log('Online mode activated');
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat 
            isConnected={connectionStatus.isConnected}
            db={db} 
            {...props} 
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;