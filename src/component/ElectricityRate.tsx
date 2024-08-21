import React, { useState } from "react";
import "./ElectricityRate.css";

const ElectricityRate: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState("มกราคม 2567");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <>
            <div className="electricityrate-container">
                <div className="electricityrate">
                    <h3>เลือกรอบจดมิเตอร์ไฟฟ้า</h3>
                    <div className="dropdown">
                        <select
                            className="form-select"
                            aria-label="เลือกเดือน"
                            value={selectedMonth}
                            onChange={handleSelectChange}
                        >
                            <option value="มกราคม 2567">มกราคม 2567</option>
                            <option value="กุมภาพันธ์ 2567">กุมภาพันธ์ 2567</option>
                            <option value="มีนาคม 2567">มีนาคม 2567</option>
                            <option value="เมษายน 2567">เมษายน 2567</option>
                            <option value="พฤษภาคม 2567">พฤษภาคม 2567</option>
                            <option value="มิถุนายน 2567">มิถุนายน 2567</option>
                            <option value="กรกฎาคม 2567">กรกฎาคม 2567</option>
                            <option value="สิงหาคม 2567">สิงหาคม 2567</option>
                            <option value="กันยายน 2567">กันยายน 2567</option>
                            <option value="ตุลาคม 2567">ตุลาคม 2567</option>
                            <option value="พฤศจิกายน 2567">พฤศจิกายน 2567</option>
                            <option value="ธันวาคม 2567">ธันวาคม 2567</option>
                        </select>
                    </div>
                </div>
                <div className="electricityrate-dropdown">
                    <h3>เดือน: {selectedMonth}</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ห้องพัก</th>
                                <th className="color">เลขก่อนหน้า</th>
                                <th className="color">เลขล่าสุด</th>
                                <th className="color">หน่วยที่ใช้</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>201</th>
                                <td className="color">0</td>
                                <td className="color-electricity">0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>202</th>
                                <td className="color">0</td>
                                <td className="color-electricity">0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className="btn btn-primary">
                        บันทึก
                    </button>
                </div>
            </div>
        </>
    );
};

export default ElectricityRate;
