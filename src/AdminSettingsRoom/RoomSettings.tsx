import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import './RoomSettings.css';

interface RoomSettingsProps {
    rentalAgreement: string;
    rentAmount: number;
    electricityRate: number;
    waterRate: number;
}

const RoomSettings: React.FC<RoomSettingsProps> = ({
    rentalAgreement: defaultRentalAgreement,
    rentAmount: defaultRentAmount,
    electricityRate: defaultElectricityRate,
    waterRate: defaultWaterRate,
}) => {
    const [rentalAgreement, setRentalAgreement] = useState<string>(defaultRentalAgreement);
    const [rentAmount, setRentAmount] = useState<number>(defaultRentAmount);
    const [electricityRate, setElectricityRate] = useState<number>(defaultElectricityRate);
    const [waterRate, setWaterRate] = useState<number>(defaultWaterRate);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRoomData = async () => {
            const user = auth.currentUser;

            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.email || ''));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setRentalAgreement(data?.rentalAgreement || defaultRentalAgreement);
                        setRentAmount(data?.rentAmount || defaultRentAmount);
                        setElectricityRate(data?.electricityRate || defaultElectricityRate);
                        setWaterRate(data?.waterRate || defaultWaterRate);
                    } else {
                        setError('ไม่พบข้อมูลห้องพัก');
                    }
                } catch (err) {
                    setError('ไม่สามารถดึงข้อมูลห้องพักได้');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('ไม่มีผู้ใช้เข้าสู่ระบบ');
                setLoading(false);
            }
        };

        fetchRoomData();
    }, [defaultRentalAgreement, defaultRentAmount, defaultElectricityRate, defaultWaterRate]);

    const handleSave = async () => {
        const user = auth.currentUser;

        if (user) {
            try {
                const userRef = doc(db, 'users', user.email || '');
                await updateDoc(userRef, {
                    rentalAgreement,
                    rentAmount,
                    electricityRate,
                    waterRate,
                });
                alert('อัปเดตข้อมูลสำเร็จ');
            } catch (err) {
                setError('ไม่สามารถอัปเดตข้อมูลได้');
            }
        } else {
            setError('ไม่มีผู้ใช้เข้าสู่ระบบ');
        }
    };

    if (loading) {
        return <div className="loading">กำลังโหลดข้อมูล...</div>; // Apply loading styles
    }

    if (error) {
        return <p className="error">{error}</p>; // Apply error styles
    }

    return (
        <div className="information">
            <p>รายละเอียดห้องพัก</p>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th><label htmlFor="rentAmount">ค่าเช่าห้อง :</label></th>
                        <td>
                            <input
                                id="rentAmount"
                                type="number"
                                value={rentAmount}
                                onChange={(e) => setRentAmount(Number(e.target.value))}
                                min="0" // Add validation
                            /> บาท
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="rentalAgreement">สัญญาเช่า :</label></th>
                        <td>
                            <input
                                id="rentalAgreement"
                                type="text"
                                value={rentalAgreement}
                                onChange={(e) => setRentalAgreement(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="electricityRate">ค่าไฟฟ้า :</label></th>
                        <td>
                            <input
                                id="electricityRate"
                                type="number"
                                value={electricityRate}
                                onChange={(e) => setElectricityRate(Number(e.target.value))}
                                min="0" // Add validation
                            /> บาท/ยูนิต
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="waterRate">ค่าน้ำ :</label></th>
                        <td>
                            <input
                                id="waterRate"
                                type="number"
                                value={waterRate}
                                onChange={(e) => setWaterRate(Number(e.target.value))}
                                min="0" // Add validation
                            /> บาท/เดือน
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSave}>บันทึก</button>
        </div>
    );
};

export default RoomSettings;
