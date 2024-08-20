import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import RoomListPage from './component/RoomListPage';
import AppNavbar from './component/AppNavbar'; // Import the renamed Navbar component
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Login from './component/Login';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                {/* Navbar */}
                <AppNavbar />

                {/* Main Content */}
                <div className="mt-5 pt-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/roomlistpage" element={<RoomListPage />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
