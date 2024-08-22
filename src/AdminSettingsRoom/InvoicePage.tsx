import React, { useState } from "react";
import "./InvoicePage.css";
import { Modal, Button } from "react-bootstrap";
import { SnippetsOutlined } from "@ant-design/icons";

const InvoicePage: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
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
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ชื่อ</th>
                                    <th scope="col">ห้อง</th>
                                    <th scope="col">ค่าเช่า</th>
                                    <th scope="col">ค่าไฟ</th>
                                    <th scope="col">ค่าน้ำ</th>
                                    <th scope="col">ค่าปรับ</th>
                                    <th scope="col">รวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>สถานะ : ค้างชำระ/ชำระเงินแล้ว</div>
                    </div>
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
