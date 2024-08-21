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

// ส่งออกบริการ Firebase
export { auth, db, storage };

// ฟังก์ชันการเพิ่มข้อมูลผู้ใช้ลงใน Firestore
export const addUser = async () => {
    try {
        // อ้างอิงถึงเอกสารของผู้ใช้ในคอลเล็กชัน 'users200'
        const userRef = doc(db, 'users', '200@room.com');

        // ข้อมูลของผู้ใช้
        const userData = {
            email: '200@room.com',
            profilePicture: 'https://via.placeholder.com/40', // รูปโปรไฟล์เริ่มต้น
            // เพิ่มข้อมูลของผู้ใช้ตามที่ต้องการ
        };

        // ตั้งค่าเอกสารผู้ใช้
        await setDoc(userRef, userData);

        console.log('เพิ่มผู้ใช้สำเร็จ!');
    } catch (error) {
        console.error('ข้อผิดพลาดในการเพิ่มผู้ใช้: ', error);
    }
};
