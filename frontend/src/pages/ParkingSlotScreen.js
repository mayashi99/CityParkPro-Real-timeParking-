import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";  // <-- Correct imports

const ParkingSlotScreen = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/slots");
                setSlots(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching slots:", error);
                setLoading(false);
            }
        };
        fetchSlots();
    }, []);

    return (
        <Container>
            <h2 className="text-center my-4">Parking Slots</h2>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {slots.map(slot => (
                        <Col key={slot.slotNumber} md={3}>
                            <Card className={`mb-3 ${slot.isOccupied ? "bg-danger text-white" : "bg-success text-white"}`}>
                                <Card.Body>
                                    <Card.Title>Slot {slot.slotNumber}</Card.Title>
                                    <Card.Text>Status: {slot.isOccupied ? "Occupied" : "Available"}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default ParkingSlotScreen;
