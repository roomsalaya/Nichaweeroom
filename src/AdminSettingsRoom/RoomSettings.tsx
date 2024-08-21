import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import './RoomSettings.css'; // Make sure this path is correct

interface RoomSettingsProps {
    rentalAgreement: string;
    electricityRate: number;
    waterRate: number;
}

const RoomSettings: React.FC<RoomSettingsProps> = ({ rentalAgreement, electricityRate, waterRate }) => {
    const [editableRentalAgreement, setEditableRentalAgreement] = useState<string>(rentalAgreement);
    const [editableElectricityRate, setEditableElectricityRate] = useState<number>(electricityRate);
    const [editableWaterRate, setEditableWaterRate] = useState<number>(waterRate);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setEditableRentalAgreement(rentalAgreement);
        setEditableElectricityRate(electricityRate);
        setEditableWaterRate(waterRate);
    }, [rentalAgreement, electricityRate, waterRate]);

    const handleSave = async () => {
        const user = auth.currentUser;

        if (user) {
            try {
                const userRef = doc(db, 'users', user.email || '');
                await updateDoc(userRef, {
                    rentalAgreement: editableRentalAgreement,
                    electricityRate: editableElectricityRate,
                    waterRate: editableWaterRate,
                });
                alert('Data updated successfully');
            } catch (error) {
                setError('Failed to update data');
            }
        } else {
            setError('No user is signed in');
        }
    };

    return (
        <div className="information">
            <p>รายละเอียดห้องพัก</p>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th>สัญญาเช่า :</th>
                        <td>
                            <input
                                type="text"
                                value={editableRentalAgreement}
                                onChange={(e) => setEditableRentalAgreement(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>ค่าไฟฟ้า :</th>
                        <td>
                            <input
                                type="number"
                                value={editableElectricityRate}
                                onChange={(e) => setEditableElectricityRate(Number(e.target.value))}
                            /> บาท/ยูนิต
                        </td>
                    </tr>
                    <tr>
                        <th>ค่าน้ำ :</th>
                        <td>
                            <input
                                type="number"
                                value={editableWaterRate}
                                onChange={(e) => setEditableWaterRate(Number(e.target.value))}
                            /> บาท/เดือน
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSave}>Save</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default RoomSettings;
