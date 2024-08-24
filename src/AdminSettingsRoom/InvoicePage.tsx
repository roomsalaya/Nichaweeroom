import React, { useState, useEffect } from 'react';
import './InvoicePage.css';
import { Modal, Button } from 'react-bootstrap';
import { SnippetsOutlined } from '@ant-design/icons';
import { db } from '../firebaseConfig'; // Adjust the import path based on your project structure
import { doc, getDoc } from 'firebase/firestore';

interface RoomPriceData {
    price: string;
}

interface WaterBillData {
    bill: string;
}

interface ElectricityData {
    previous: string;
    current: string;
    units: string;
    amount: string;
}

interface RoomPriceDataState {
    [key: string]: RoomPriceData;
}

interface WaterBillDataState {
    [key: string]: WaterBillData;
}

interface ElectricityDataState {
    [key: string]: ElectricityData;
}

const InvoicePage: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>('มกราคม');
    const [selectedYear, setSelectedYear] = useState<string>('2567');
    const [selectedRoom, setSelectedRoom] = useState<string>('201');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [roomPriceData, setRoomPriceData] = useState<RoomPriceDataState>({});
    const [waterBillData, setWaterBillData] = useState<WaterBillDataState>({});
    const [electricityData, setElectricityData] = useState<ElectricityDataState>({});
    const [rooms, setRooms] = useState<string[]>([]);

    useEffect(() => {
        fetchDataForMonth(selectedMonth, selectedYear);
        fetchWaterBillData(selectedMonth, selectedYear);
        fetchElectricityData(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoom(event.target.value);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const fetchDataForMonth = async (month: string, year: string) => {
        const monthYear = `${month} ${year}`;
        try {
            const docRef = doc(db, 'RoompriceData', monthYear);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const fetchedData = docSnap.data() as RoomPriceDataState;
                setRoomPriceData(fetchedData);
            } else {
                console.log('No room price data found for the selected month and year.');
                setRoomPriceData({}); // Clear data if not found
            }
        } catch (error) {
            console.error('Error fetching room price data: ', error);
        }
    };

    const fetchWaterBillData = async (month: string, year: string) => {
        const monthYear = `${month} ${year}`;
        try {
            const docRef = doc(db, 'waterBillData', monthYear);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const fetchedData = docSnap.data() as WaterBillDataState;
                setWaterBillData(fetchedData);
                setRooms(Object.keys(fetchedData)); // Update rooms based on fetched data
            } else {
                console.log('No water bill data found for the selected month and year.');
                setWaterBillData({}); // Clear data if not found
            }
        } catch (error) {
            console.error('Error fetching water bill data: ', error);
        }
    };

    const fetchElectricityData = async (month: string, year: string) => {
        const monthYear = `${month} ${year}`;
        try {
            const docRef = doc(db, 'electricityData', monthYear);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const fetchedData = docSnap.data() as ElectricityDataState;
                setElectricityData(fetchedData);
                // Directly set rooms based on fetched data
                setRooms(Object.keys(fetchedData));
            } else {
                console.log('No electricity data found for the selected month and year.');
                setElectricityData({}); // Clear data if not found
            }
        } catch (error) {
            console.error('Error fetching electricity data: ', error);
        }
    };

    const data = [
        { id: 1, description: `ค่าเช่าห้อง ${selectedRoom} เดือนถัดไป`, amount: roomPriceData[selectedRoom]?.price || 'N/A' },
        { id: 2, description: `ค่าน้ำ เดือน ${selectedMonth}`, amount: waterBillData[selectedRoom]?.bill || 'N/A' },
        { id: 3, description: `ค่าไฟฟ้า เดือน ${selectedMonth}`, amount: electricityData[selectedRoom]?.amount || 'N/A' },
    ];

    return (
        <div className="invoicepage-container">
            <div className="invoicepage">
                <h4>เลือกรอบบิล</h4>
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
                    </select>
                </div>
            </div>
            <div className="invoicepage">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Button variant="secondary" onClick={handleShowModal}>
                                <h5>{selectedRoom}</h5>
                                <SnippetsOutlined />
                                <p>จำนวนเงิน</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>ห้องพัก {selectedRoom} - {selectedMonth} {selectedYear}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <select
                            className="form-select"
                            aria-label="เลือกห้องค่าน้ำ"
                            value={selectedRoom}
                            onChange={handleRoomChange}
                        >
                            {rooms.map(room => (
                                <option key={room} value={room}>
                                    ค่าเช่า {room}
                                </option>
                            ))}
                        </select>

                        <table className="invoice-table">
                            <thead>
                                <tr>
                                    <th className="invoice-header">รายการ</th>
                                    <th className="invoice-header invoice-amount">จำนวนเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="invoice-cell">{item.description}</td>
                                        <td className="invoice-cell invoice-amount">{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InvoicePage;
