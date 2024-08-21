import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Login from './component/Login';
import UserProfile from './users/UserProfile';
import ProfileSettingsPage from './users/ProfileSettingsPage';
import RoomSettings from './AdminSettingsRoom/RoomSettings';
import RentalInvoiceAccordion from './users/RentalInvoiceAccordion';

const App: React.FC = () => {
    // ตัวอย่างค่าที่ใช้เป็น props
    const rentalAgreement = 'สัญญาเช่าตัวอย่าง';
    const electricityRate = 10; // บาท/ยูนิต
    const waterRate = 120; // บาท/เดือน

    return (
        <Router>
            <div>
                {/* Navbar */}

                {/* Main Content */}
                <div className="mt-5 pt-5">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profilepage" element={<UserProfile />} />
                        <Route path="/profilesettingpage" element={<ProfileSettingsPage />} />
                        <Route
                            path="/roomsettings"
                            element={
                                <RoomSettings
                                    rentalAgreement={rentalAgreement}
                                    electricityRate={electricityRate}
                                    waterRate={waterRate}
                                />
                            }
                        />
                        <Route path="/rentalinvoiceaccordion" element={<RentalInvoiceAccordion />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
