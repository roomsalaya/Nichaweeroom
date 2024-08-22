import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// การตั้งค่า Firebase ของคุณ
const firebaseConfig = {
    apiKey: "AIzaSyBV1zfZd4vmzDczjVgPgEVEUHpCE_igUTU",
    authDomain: "newroom-76a50.firebaseapp.com",
    projectId: "newroom-76a50",
    storageBucket: "newroom-76a50.appspot.com",
    messagingSenderId: "321915333016",
    appId: "1:321915333016:web:504716e934036d3e6be3ed",
};

// เริ่มต้นการตั้งค่า Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // รับอินสแตนซ์ Auth
const db = getFirestore(app); // รับอินสแตนซ์ Firestore
const storage = getStorage(app); // รับอินสแตนซ์ Storage

// ส่งออกบริการ Firebase พร้อมกับ app
export { app, auth, db, storage };
