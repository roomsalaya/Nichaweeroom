import React, { useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar, Container, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../firebaseConfig'; // Import the Firebase auth
import { onAuthStateChanged, signOut, User } from 'firebase/auth'; // Import auth functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AppNavbar.css';

const AppNavbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                navigate('/login'); // Redirect to login if not authenticated
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Successfully logged out.");
            navigate('/login'); // Redirect to login after logout
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <BootstrapNavbar bg="light" expand="lg" fixed="top" className="navbar-custom">
            <Container fluid>
                <BootstrapNavbar.Brand href="/">หอพักณิชชาวีร์</BootstrapNavbar.Brand>
                
                {/* User Avatar */}
                {user && (
                    <div className="d-flex align-items-center ms-auto user-avatar">
                        <Dropdown align="end"> {/* Align dropdown to the end (right) */}
                            <Dropdown.Toggle variant="link" id="user-avatar-dropdown">
                                <img
                                    src={user.photoURL || 'https://via.placeholder.com/40'}
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    style={{ width: '40px', height: '40px' }}
                                />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Profile</Dropdown.Item>
                                <Dropdown.Item href="#">บิลค่าเช่า</Dropdown.Item>
                                <Dropdown.Item href="#">แจ้งชำระเงิน</Dropdown.Item>
                                <Dropdown.Item href="#">แจ้งซ่อม</Dropdown.Item>
                                <Dropdown.Item href="#">กระดานข่าว</Dropdown.Item>
                                <Dropdown.Item href="#">วิเคราะรายจ่าย</Dropdown.Item>
                                <Dropdown.Item href="#">Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </Container>
        </BootstrapNavbar>
    );
};

export default AppNavbar;
