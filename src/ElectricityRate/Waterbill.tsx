import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Adjust the import path based on your project structure
import { doc, setDoc, getDoc } from "firebase/firestore";
import "../ElectricityRate/Waterbill.css"; // Adjust path to your CSS file

// Define the shape of the water bill data for each room
interface WaterBillData {
    bill: string;
}

// Define the type for the state holding water bill data
interface WaterBillDataState {
    [key: string]: WaterBillData;
}

const WaterBill: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState("มกราคม");
    const [selectedYear, setSelectedYear] = useState("2567");
    const [waterBillData, setWaterBillData] = useState<WaterBillDataState>({});

    useEffect(() => {
        fetchDataForMonth(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const fetchDataForMonth = async (month: string, year: string) => {
        const monthYear = `${month} ${year}`;
        try {
            const docRef = doc(db, "waterBillData", monthYear);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Retrieve data from Firestore
                const fetchedData = docSnap.data() as WaterBillDataState;

                // Merge fetched data with existing data
                setWaterBillData(prevData => {
                    const updatedData = { ...prevData, ...fetchedData };
                    return updatedData;
                });
            } else {
                // If no data exists, set default values
                setWaterBillData({
                    '201': { bill: '0' },
                    '202': { bill: '0' },
                    '203': { bill: '0' },
                    '204': { bill: '0' },
                    '205': { bill: '0' },
                    '206': { bill: '0' },
                    '207': { bill: '0' },
                    '208': { bill: '0' },
                    '309': { bill: '0' },
                    '310': { bill: '0' },
                    '311': { bill: '0' },
                    '312': { bill: '0' },
                    '313': { bill: '0' },
                    '314': { bill: '0' },
                    '315': { bill: '0' },
                    '316': { bill: '0' },
                    '225': { bill: '0' },
                    '226': { bill: '0' },
                    '227': { bill: '0' },
                    '228': { bill: '0' },
                    '329': { bill: '0' },
                    '330': { bill: '0' },
                    '331': { bill: '0' },
                    '332': { bill: '0' },
                    // Add other rooms as needed
                });
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const saveDataToFirestore = async () => {
        const monthYear = `${selectedMonth} ${selectedYear}`;
        try {
            await setDoc(doc(db, "waterBillData", monthYear), waterBillData);
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error saving data: ", error);
            alert("Failed to save data.");
        }
    };

    const handleInputChange = (room: string, field: keyof WaterBillData, value: string) => {
        setWaterBillData(prevData => {
            const updatedData = {
                ...prevData,
                [room]: {
                    ...prevData[room],
                    [field]: value,
                },
            };
            return updatedData;
        });
    };

    return (
        <>
            <div className="waterbill-container">
                <div className="waterbill">
                    <h3>ค่าประปา</h3>
                    <div className="dropdown">
                        <select
                            className="form-select"
                            aria-label="เลือกเดือน"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            <option value="มกราคม">มกราคม</option>
                            <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                            <option value="มีนาคม">มีนาคม</option>
                            <option value="เมษายน">เมษายน</option>
                            <option value="พฤษภาคม">พฤษภาคม</option>
                            <option value="มิถุนายน">มิถุนายน</option>
                            <option value="กรกฎาคม">กรกฎาคม</option>
                            <option value="สิงหาคม">สิงหาคม</option>
                            <option value="กันยายน">กันยายน</option>
                            <option value="ตุลาคม">ตุลาคม</option>
                            <option value="พฤศจิกายน">พฤศจิกายน</option>
                            <option value="ธันวาคม">ธันวาคม</option>
                        </select>
                        <select
                            className="form-select"
                            aria-label="เลือกปี"
                            value={selectedYear}
                            onChange={handleYearChange}
                        >
                            <option value="2567">2567</option>
                            <option value="2568">2568</option>
                            <option value="2569">2569</option>
                            <option value="2570">2570</option>
                            <option value="2571">2571</option>
                            <option value="2572">2572</option>
                            <option value="2573">2573</option>
                            {/* Add more years as needed */}
                        </select>
                    </div>
                </div>
                <div className="waterbill-dropdown">
                    <h3>{`${selectedMonth} ${selectedYear}`}</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ห้องพัก</th>
                                <th>ค่าน้ำ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(waterBillData).map(room => (
                                <tr key={room}>
                                    <th>{room}</th>
                                    <td className="color">
                                        <input
                                            type="number"
                                            value={waterBillData[room].bill}
                                            onChange={(e) => handleInputChange(room, 'bill', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="save-button">
                        <button className="btn btn-primary" onClick={saveDataToFirestore}>
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WaterBill;
