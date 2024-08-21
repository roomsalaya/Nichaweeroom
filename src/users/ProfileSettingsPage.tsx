import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebaseConfig'; // Import storage
import { onAuthStateChanged } from 'firebase/auth';
import './ProfileSettingsPage.css';
import AppNavbar from '../component/AppNavbar';

const ProfileSettingsPage: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [roomNumber, setRoomNumber] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(db, 'users', user.email || ''));
                        if (userDoc.exists()) {
                            const data = userDoc.data();
                            setProfilePicture(data.profilePicture || '');
                            setRoomNumber(data.roomNumber || '');
                            setFullName(data.fullName || '');
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
                    const storageRef = ref(storage, `profile_pictures/${user.uid}/${file.name}`);
                    await uploadBytes(storageRef, file);
                    profilePicUrl = await getDownloadURL(storageRef);
                }

                await setDoc(doc(db, 'users', user.email || ''), {
                    profilePicture: profilePicUrl,
                    roomNumber,
                    fullName,
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
            <AppNavbar />
            <div className="settings-container">
                <h2>ตั้งค่าโปรไฟล์</h2>
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
                        <p>หมายเหตุ : กดบันทึกแล้วรอสักครู่ . . .</p>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="btn btn-primary">บันทึก</button>
                </form>
            </div>
        </>

    );
};

export default ProfileSettingsPage;
