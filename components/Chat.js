import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={[]} // Initialize with empty messages, to be implemented later
        onSend={() => {}}
        user={{ _id: 1, name: name }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
});

export default Chat;
