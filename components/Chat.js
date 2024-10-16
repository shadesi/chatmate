import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarImage from '../assets/avatar.png';

const Chat = ({ route, navigation, db, isConnected }) => {
  // State to hold our messages
  const [messages, setMessages] = useState([]);
  // Destructure name and bgColor from route params
  const { userID, name, bgColor } = route.params;

  // Load messages from AsyncStorage
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('messages');
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.error('Error loading cached messages:', error);
    }
  };

  // Cache messages in AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.error('Error caching messages:', error);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // Unregister current onSnapshot listener to avoid duplicate listeners
      if (unsubMessages) unsubMessages();

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, (querySnapshot) => {
        const newMessages = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        }));
        setMessages(newMessages);
        cacheMessages(newMessages);
      });

      // Cleanup function
      return () => {
        if (unsubMessages) unsubMessages();
      };
    } else {
      loadCachedMessages();
    }
  }, [isConnected]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
    );
  }

  // Render InputToolbar only when online
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  }
});

export default Chat;