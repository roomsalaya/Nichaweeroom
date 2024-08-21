import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './UserProfile.css';
import AppNavbar from '../component/AppNavbar';

const UserProfile: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [rentalAgreement, setRentalAgreement] = useState<string>('');
    const [electricityRate, setElectricityRate] = useState<number>(9); // Default rate: 9 THB per unit
    const [waterRate, setWaterRate] = useState<number>(100); // Default rate: 100 THB per month

    useEffect(() => {
        const fetchUserData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(db, 'users', user.email || ''));
                        if (userDoc.exists()) {
                            const data = userDoc.data();
                            setProfilePicture(data.profilePicture || '');
                            setFullName(data.fullName || '');
                            setRentalAgreement(data.rentalAgreement || 'ไม่พบข้อมูลสัญญาเช่า');
                            setElectricityRate(data.electricityRate || 9);
                            setWaterRate(data.waterRate || 100);
                        } else {
                            setError('No user data found.');
                        }
                    } catch (error) {
                        setError('Failed to fetch user data.');
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setError('No user is signed in.');
                    setLoading(false);
                }
            });
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
        <AppNavbar/>
            <div>
                <div className="profilecontainer">
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                    <div className="profile-details">
                        <p>ห้องพัก : 201</p>
                        <p>ชื่อ นามสกุล : {fullName}</p>
                    </div>
                </div>
                <div className='information'>
                    <p>รายละเอียดห้องพัก</p>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th>สัญญาเช่า :</th>
                                <td>{rentalAgreement}</td>
                            </tr>
                            <tr>
                                <th>ค่าไฟฟ้า :</th>
                                <td>{electricityRate} บาท/ยูนิต</td>
                            </tr>
                            <tr>
                                <th>ค่าน้ำ :</th>
                                <td>{waterRate} บาท/เดือน</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
