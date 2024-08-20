import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBV1zfZd4vmzDczjVgPgEVEUHpCE_igUTU",
    authDomain: "newroom-76a50.firebaseapp.com",
    projectId: "newroom-76a50",
    storageBucket: "newroom-76a50.appspot.com",
    messagingSenderId: "321915333016",
    appId: "1:321915333016:web:504716e934036d3e6be3ed",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Auth instance
const firestore = getFirestore(app); // Get Firestore instance (if needed)

export { auth, firestore }; // Export auth and firestore
