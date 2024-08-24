import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './ProfileSettingsPage201.css';
import AppNavbar201 from './AppNavbar201';

const ProfileSettingsPage201: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [roomNumber, setRoomNumber] = useState<string>('201');
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        // Fetch data from the specific document for room 201
                        const userDoc = await getDoc(doc(db, 'users201', user.email || ''));
                        if (userDoc.exists()) {
                            const data = userDoc.data();
                            setProfilePicture(data.profilePicture || '');
                            setRoomNumber(data.roomNumber || '201');
                            setFullName(data.fullName || '');
                            setPhoneNumber(data.phoneNumber || '');
                        }
                    } catch (error) {
                        setError('Failed to fetch user data.');
                    } finally {
                        setLoading(false);
                    }
                }
            });
        };

        fetchUserData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = auth.currentUser;
            if (user) {
                let profilePicUrl = profilePicture;

                if (file) {
                    const storageRef = ref(storage, `profile_pictures_201/${user.uid}/${file.name}`);
                    await uploadBytes(storageRef, file);
                    profilePicUrl = await getDownloadURL(storageRef);
                }

                // Update data for room 201
                await setDoc(doc(db, 'users201', user.email || ''), {
                    profilePicture: profilePicUrl,
                    roomNumber,
                    fullName,
                    phoneNumber,
                });
                alert('Profile updated successfully!');
            }
        } catch (error) {
            setError('Failed to update profile.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <AppNavbar201 />
            <div className="settings-container">
                <h2>ตั้งค่าโปรไฟล์ห้อง 201</h2>
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="profilePicture">รูปภาพโปรไฟล์ :</label>
                        <input
                            type="file"
                            id="profilePicture"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName">ชื่อ-นามสกุล :</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">เบอร์โทร :</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="btn btn-primary">บันทึก</button>
                </form>
            </div>
        </>
    );
};

export default ProfileSettingsPage201;
