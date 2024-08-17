// firebaseConfig.ts
import firebase from 'firebase/app';
import 'firebase/database';

// Tu configuración de Firebase
const fb = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.getApps.length) {
  firebase.initializeApp(fb);
}

export default firebase;
