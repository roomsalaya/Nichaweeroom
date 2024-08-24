import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Assuming db is your Firestore instance
import './RoomSettings201.css'; // Ensure this CSS file exists and is styled as needed

interface RoomSettings201Props {
    rentalAgreement: string;
    rentAmount: number;
    electricityRate: number;
    waterRate: number;
}

const RoomSettings201: React.FC<RoomSettings201Props> = ({
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
            try {
                const userDoc = await getDoc(doc(db, 'users201', '201@room.com')); // Placeholder or real email
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
        };

        fetchRoomData();
    }, [defaultRentalAgreement, defaultRentAmount, defaultElectricityRate, defaultWaterRate]);

    const handleSave = async () => {
        try {
            const userRef = doc(db, 'users201', '201@room.com'); // Placeholder or real email
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
    };

    if (loading) {
        return <div className="loading">กำลังโหลดข้อมูล...</div>;
    }

    if (error) {
        return <p className="error">{error}</p>;
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
                                min="0"
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
                                onChange={(e) => setRentalAgreement(e.target.value)} // Corrected parentheses
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
                                min="0"
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
                                min="0"
                            /> บาท/เดือน
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSave}>บันทึก</button>
        </div>
    );
};

export default RoomSettings201;
