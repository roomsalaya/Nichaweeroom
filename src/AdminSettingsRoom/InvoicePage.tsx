import React, { useState, useEffect } from 'react';
import './InvoicePage.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { SnippetsOutlined } from '@ant-design/icons';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const InvoicePage: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>('มกราคม');
    const [selectedYear, setSelectedYear] = useState<string>('2567');
    const [roomData, setRoomData] = useState<{ rent: string; water: string; electricity: string }>({ rent: '0', water: '0', electricity: '0' });
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        fetchRoomData();
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const fetchRoomData = async () => {
        const docRef = doc(db, 'RoompriceData', `${selectedMonth} ${selectedYear}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const roomInfo = data['201'] || { rent: '0', water: '0', electricity: '0' };
            setRoomData(roomInfo);
        } else {
            console.log('No such document!');
            setRoomData({ rent: '0', water: '0', electricity: '0' });
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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
                        {/* Add other months */}
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
                                <h5>201</h5>
                                <SnippetsOutlined />
                                <p>ดูรายละเอียด</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>ห้อง 201 - {selectedMonth} {selectedYear}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>รายการ</th>
                                <th>จำนวนเงิน (บาท)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                        placeholder='ค่าเช่า'
                                    />
                                </td>
                                <td>{roomData.rent}</td>
                            </tr>
                            <tr>
                                <td>ค่าน้ำ</td>
                                <td>{roomData.water}</td>
                            </tr>
                            <tr>
                                <td>ค่าไฟ</td>
                                <td>{roomData.electricity}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InvoicePage;
