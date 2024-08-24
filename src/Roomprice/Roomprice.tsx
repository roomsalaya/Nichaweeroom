import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Adjust the import path based on your project structure
import { doc, setDoc, getDoc } from "firebase/firestore";
import "../ElectricityRate/ElectricityRate.css";

// Define the shape of the room price data for each room
interface RoompriceData {
    price: string;
}

// Define the type for the state holding room price data
interface RoompriceDataState {
    [key: string]: RoompriceData;
}

const Roomprice: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState("มกราคม");
    const [selectedYear, setSelectedYear] = useState("2567");
    const [roompriceData, setRoompriceData] = useState<RoompriceDataState>({});

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
            const docRef = doc(db, "RoompriceData", monthYear);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Retrieve data from Firestore
                const fetchedData = docSnap.data() as RoompriceDataState;

                // Merge fetched data with existing data
                setRoompriceData(prevData => {
                    const updatedData = { ...prevData, ...fetchedData };
                    return updatedData;
                });
            } else {
                // If no data exists, set default values
                setRoompriceData({
                    '201': { price: '0' },
                    '202': { price: '0' },
                    '203': { price: '0' },
                    '204': { price: '0' },
                    '205': { price: '0' },
                    '206': { price: '0' },
                    '207': { price: '0' },
                    '208': { price: '0' },
                    '309': { price: '0' },
                    '310': { price: '0' },
                    '311': { price: '0' },
                    '312': { price: '0' },
                    '313': { price: '0' },
                    '314': { price: '0' },
                    '315': { price: '0' },
                    '316': { price: '0' },
                    '225': { price: '0' },
                    '226': { price: '0' },
                    '227': { price: '0' },
                    '228': { price: '0' },
                    '329': { price: '0' },
                    '330': { price: '0' },
                    '331': { price: '0' },
                    '332': { price: '0' },
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
            await setDoc(doc(db, "RoompriceData", monthYear), roompriceData);
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error saving data: ", error);
            alert("Failed to save data.");
        }
    };

    const handleInputChange = (room: string, field: keyof RoompriceData, value: string) => {
        setRoompriceData(prevData => {
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
            <div className="electricityrate-container">
                <div className="electricityrate">
                    <h3>ราคาค่าเช่าหอพัก</h3>
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
                <div className="electricityrate-dropdown">
                    <h3>{`${selectedMonth} ${selectedYear}`}</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ห้องพัก</th>
                                <th>ราคาห้องพัก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(roompriceData).map(room => (
                                <tr key={room}>
                                    <th>{room}</th>
                                    <td className="color">
                                        <input
                                            type="number"
                                            value={roompriceData[room].price}
                                            onChange={(e) => handleInputChange(room, 'price', e.target.value)}
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

export default Roomprice;
