import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import UserProfile from './users/UserProfile';
import ProfileSettingsPage from './users/ProfileSettingsPage';
import RoomSettings from './AdminSettingsRoom/RoomSettings';
import RentalInvoiceAccordion from './users/RentalInvoiceAccordion';
import ElectricityRate from './ElectricityRate/ElectricityRate';
import Showelectricity from './ElectricityRate/Showelectricity';
import InvoicePage from './AdminSettingsRoom/InvoicePage';
import UserProfile201 from './user201/UserProfile201';
import ProfileSettingsPage201 from './user201/ProfileSettingsPage201';
import RoomSettings201 from './RoomSettings/RoomSettings201';
import Roomprice from './Roomprice/Roomprice';
import WaterBill from './ElectricityRate/Waterbill';

const App: React.FC = () => {
    // ตัวอย่างค่าที่ใช้เป็น props
    const rentalAgreement = 'สัญญาเช่าตัวอย่าง';
    const rentAmount = 3200; // Add this line to define rentAmount
    const electricityRate = 9; // บาท/ยูนิต
    const waterRate = 100; // บาท/เดือน

    return (
        <Router>
            <div>
                {/* Main Content */}
                <div className="mt-5 pt-5">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/profilepage" element={<UserProfile />} />
                        <Route path="/profilesettingpage" element={<ProfileSettingsPage />} />
                        <Route
                            path="/roomsettings"
                            element={
                                <RoomSettings
                                    rentAmount={rentAmount} // Correctly passing rentAmount
                                    rentalAgreement={rentalAgreement}
                                    electricityRate={electricityRate}
                                    waterRate={waterRate}
                                />
                            }
                        />
                        <Route path='/electricityrate' element={<ElectricityRate />} />
                        <Route path='/showelectricity' element={<Showelectricity />} />
                        <Route path="/rentalinvoiceaccordion" element={<RentalInvoiceAccordion />} />
                        <Route path='/invoicepage' element={<InvoicePage />} /> {/* Correct the typo here */}
                        <Route path='/roomprice' element={<Roomprice/>} />
                        <Route path='/waterbill' element={<WaterBill/>}/>

                        {/* user201 */}
                        <Route path='/userprofile201' element={<UserProfile201 />} />
                        <Route path='/profilesettingpage201' element={<ProfileSettingsPage201 />} />
                        <Route path='/roomsettings201' element={<RoomSettings201
                            rentalAgreement={rentalAgreement}
                            rentAmount={rentAmount}
                            electricityRate={electricityRate}
                            waterRate={waterRate} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
