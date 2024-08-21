import React, { useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar, Container, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, db } from '../firebaseConfig'; // Import the Firebase auth and Firestore
import { onAuthStateChanged, signOut, User } from 'firebase/auth'; // Import auth functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import './AppNavbar.css';

const AppNavbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [profilePicture, setProfilePicture] = useState<string>(''); // State for profile picture
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.email || ''));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setProfilePicture(data.profilePicture || 'https://via.placeholder.com/40'); // Default placeholder
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                }
            } else {
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
                                    src={profilePicture}
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    style={{ width: '40px', height: '40px' }}
                                />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/profilepage">บัญชี</Dropdown.Item>
                                <Dropdown.Item href="/rentalinvoiceaccordion">บิลค่าเช่า</Dropdown.Item>
                                <Dropdown.Item href="#">แจ้งชำระเงิน</Dropdown.Item>
                                <Dropdown.Item href="#">แจ้งซ่อม</Dropdown.Item>
                                <Dropdown.Item href="#">กระดานข่าว</Dropdown.Item>
                                <Dropdown.Item href="#">วิเคราะรายจ่าย</Dropdown.Item>
                                <Dropdown.Item href="/profilesettingpage">ตั้งค่าบัญชี</Dropdown.Item>
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
