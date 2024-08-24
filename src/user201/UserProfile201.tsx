import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './UserProfile201.css'; // Ensure to create this CSS file
import AppNavbar201 from './AppNavbar201';

const UserProfile201: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [rentalAgreement, setRentalAgreement] = useState<string>('');
    const [rentAmount, setRentAmount] = useState<number>(3200);
    const [electricityRate, setElectricityRate] = useState<number>(9);
    const [waterRate, setWaterRate] = useState<number>(100);

    useEffect(() => {
        const fetchUserData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(db, 'users201', user.email || ''));
                        if (userDoc.exists()) {
                            const data = userDoc.data();
                            setProfilePicture(data.profilePicture || '');
                            setFullName(data.fullName || '');
                            setPhoneNumber(data.phoneNumber || '');
                            setRentalAgreement(data.rentalAgreement || 'ไม่พบข้อมูลสัญญาเช่า');
                            setRentAmount(data.rentAmount || 3200);
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
            <AppNavbar201 />
            <div>
                <div className="profilecontainer">
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                    <div className="profile-details">
                        <p>ห้องพัก : 201</p>
                        <p>ชื่อ นามสกุล : {fullName}</p>
                        <p>เบอร์โทร : {phoneNumber}</p>
                    </div>
                </div>
                <div className='information'>
                    <p>รายละเอียดห้องพัก</p>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th>ค่าเช่าห้อง :</th>
                                <td>{rentAmount} บาท</td>
                            </tr>
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

export default UserProfile201;
