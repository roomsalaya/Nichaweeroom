import React from 'react';
import { Table } from 'react-bootstrap';

const RoomListPage: React.FC = () => {
    // Sample data
    const rooms = [
        { room: '101', rent: '1000', status: 'Available' },
        { room: '102', rent: '1200', status: 'Occupied' },
    ];

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Rent</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map((room, index) => (
                    <tr key={index}>
                        <td>{room.room}</td>
                        <td>{room.rent}</td>
                        <td>{room.status}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RoomListPage;
