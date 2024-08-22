import React, { useState } from 'react';
import './InvoicePage.css';
import { Modal, Button } from 'react-bootstrap';
import { SnippetsOutlined } from '@ant-design/icons';

const InvoicePage: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='invoicepage-container'>
            <div className='invoicepage'>
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
                        {/* Add more years as needed */}
                    </select>
                </div>
            </div>
            <div className='invoicepage'>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Button variant="secondary" onClick={handleShowModal}>
                                    <h5>201</h5>
                                    <SnippetsOutlined />
                                    <p>จำนวนเงิน</p>
                                </Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" onClick={handleShowModal}>
                                    <h5>202</h5>
                                    <SnippetsOutlined />
                                    <p>จำนวนเงิน</p>
                                </Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" onClick={handleShowModal}>
                                    <h5>204</h5>
                                    <SnippetsOutlined />
                                    <p>จำนวนเงิน</p>
                                </Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" onClick={handleShowModal}>
                                    <h5>205</h5>
                                    <SnippetsOutlined />
                                    <p>จำนวนเงิน</p>
                                </Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" onClick={handleShowModal}>
                                    <h5>206</h5>
                                    <SnippetsOutlined />
                                    <p>จำนวนเงิน</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มบิลใหม่</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><label htmlFor="invoiceName" className="form-label">ชื่อบิล</label></td>
                                <td><input type="text" className="form-control" id="invoiceName" placeholder="กรอกชื่อบิล" /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="invoiceAmount" className="form-label">ค่าเช่า</label></td>
                                <td><input type="number" className="form-control" id="invoiceAmount" placeholder="กรอกจำนวนเงิน" /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="invoiceAmount" className="form-label">ค่าไฟ</label></td>
                                <td><input type="number" className="form-control" id="invoiceAmount" placeholder="กรอกจำนวนเงิน" /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="invoiceAmount" className="form-label">ค่าน้ำ</label></td>
                                <td><input type="number" className="form-control" id="invoiceAmount" placeholder="กรอกจำนวนเงิน" /></td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InvoicePage;
