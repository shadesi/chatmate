import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, storage, onSend, userID }) => {
  const actionSheet = useActionSheet();

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permissions haven't been granted.");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        console.log('Location fetched:', location);
        onSend([{ 
          _id: Math.random().toString(36).substring(7),
          createdAt: new Date(),
          user: { _id: userID },
          location: { longitude: location.coords.longitude, latitude: location.coords.latitude } 
        }]);
      } else {
        Alert.alert("Error occurred while fetching location.");
      }
    } else {
      Alert.alert("Location permissions haven't been granted.");
    }
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend([{ 
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        user: { _id: userID },
        image: imageURL 
      }]);
    });
  };

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/").pop();
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0: pickImage(); break;
          case 1: takePhoto(); break;
          case 2: getLocation(); break;
          default: break;
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress} accessible={true} accessibilityLabel="More options" accessibilityHint="Choose an action to perform">
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;
