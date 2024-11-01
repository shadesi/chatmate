# ChatMate App

ChatMate is a real-time chat application built using React Native with Expo, and integrates Firebase for authentication, Firestore for database management, and Firebase Cloud Storage for storing media files. The app allows users to send images, take photos, share their location, and exchange messages in real-time.

## Features

* Anonymous user authentication via Firebase. 
* Real-time message exchange using Firestore. 
* Upload and display images from device library or taken using camera. 
* Share current location within chat messages. 
* Message history persisted between sessions. 
* Offline support with cached messages. 
* Media storage using Firebase Cloud Storage.
* Accessible action buttons using React Native's accessibility features. 

### Technologies Used: 
* React Native (via Expo) Firebase (Authentication, Firestore, Storage) 
* Expo Image Picker and Expo Location for media and geolocation. 
* React Native Gifted Chat for the chat interface. 
* React Native Maps for location sharing. Project Setup
   
   ### Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js: Ensure Node.js is installed on your machine. Install Node.js.
* Expo CLI: Install Expo CLI globally by running:
```
npm install -g expo-cli
```

#### Firebase Account: 
You'll need a Firebase account and project for backend services.
Android Studio: For testing on Android emulator. Download Android Studio.
Xcode: For testing on iOS simulator (macOS users only).

#### Step 1: Clone the Repository
First, clone the GitHub repository to your local machine:
```
git clone https://github.com/your-username/chatmate-app.git
cd chatmate-app
````
#### Step 2: Install Dependencies
Install the necessary npm packages:
```
npm install
````
#### Step 3: Firebase Configuration
1. Go to the Firebase Console and create a new project.
Add Firebase to your project:

2. Go to Project Settings.
Under Your apps, select the Web icon.
Copy the Firebase config object.

3. In your project, open App.js and replace the Firebase configuration with your own:
```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Enable Authentication:

4. Go to the Authentication section of Firebase Console.
Under Sign-in Method, enable Anonymous Authentication.
Enable Firestore Database:

5. Go to the Firestore Database section.
Click Create database and choose your security rules and location.
Enable Firebase Storage:

6. Go to the Storage section.
Click Get started and set up your storage bucket.
Go to Rules and modify the storage rules to allow read and write for now (for testing purposes):
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
````

#### Step 4: Environment Setup
Install the required Expo and Firebase packages for the project:
```
expo install expo-image-picker expo-location react-native-maps @react-native-async-storage/async-storage @react-native-community/netinfo
npm install firebase react-native-gifted-chat @expo/react-native-action-sheet
````

#### Step 5: Running the App
Start the development server:
```
expo start
```
Open the app on an Android or iOS emulator, or scan the QR code in the Expo app on your physical device.

#### Step 6: Firebase Firestore Rules
For security purposes, you may want to set up Firestore rules based on user authentication:
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{message} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Step 7: Testing Features
You can test the following features in the app:

Authentication: You will be signed in anonymously when you enter the chat.
Sending Messages: Type and send messages that will be stored in Firestore.
Sending Images: You can either pick an image from your device's gallery or take a new photo and send it.
Sharing Location: Share your current location, which will be displayed on a map within the chat.
Media Storage: Images and photos are uploaded to Firebase Storage and displayed in the chat.
Step 8: Deployment (Optional)
To deploy the app to production, follow Expo’s deployment guide: Deploying your app.

Troubleshooting
Common Issues:
Firebase Auth Warning: If you see a warning about Firebase Auth persistence, make sure you've installed @react-native-async-storage/async-storage and initialized Firebase Auth correctly using:
```
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
```


Offline Mode: If the app doesn’t load cached messages while offline, ensure that AsyncStorage is configured correctly and the network status is being checked via @react-native-community/netinfo.

Location Services: If location sharing doesn’t work, ensure that you’ve requested the correct permissions using expo-location.

Recording Functionality Test
To verify that all features are working as expected:

Open Chat Screen: Enter the chat screen after authentication.
Pick an Image: Pick an image from the device library and send it.
Take a Photo: Use the device camera to take a photo and send it.
Share Location: Share the current location and verify that it displays a map.
Firestore Data: Check Firestore for the messages sent and ensure that the location and media data is stored.
Firebase Storage: Confirm that the images are stored in Firebase Storage.

### Project Structure
```
chatmate-app/
├── components/
│   ├── Chat.js
│   ├── CustomActions.js
│   ├── Start.js
├── assets/
│   ├── background-image.png
│   └── avatar.png
├── App.js
├── package.json
└── README.md
```
### License
This project is licensed under the MIT License.

#### Reflection
Role: As the developer, I was responsible for the entire app’s architecture, including Firebase integration, real-time messaging, and media handling.

#### Challenges & Decisions:

Using Firebase to manage both Firestore and Storage required setting up proper rules for security.
Deciding to implement image upload, camera access, and geolocation improved the chat experience.
What I'd Do Differently:

I’d explore using Firebase Authentication with OAuth for more robust authentication methods.
Technologies Used:

React Native, Firebase (Firestore, Storage, Auth), Expo, React Native Gifted Chat.
