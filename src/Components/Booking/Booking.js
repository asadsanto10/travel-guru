import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import location from '../../Data/locationData';
import './Booking.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calnderIcons from '../../Icon/calender_icon.png';
const Booking = () => {
    const {locationId} = useParams();
    const matcData = location.find(lo => lo.id === parseInt(locationId));
    const {name, description} = matcData;
    const [selectDateTo, setSelectDateTo] = useState(null);
    const [selectDateFrom, setSelectDateFrom] = useState(null);

    return (
        <div className="booking">
            <Container>
                <Row>
                    <Col md={8}>
                        <h2 className="title">{name}</h2>
                        <p>{description}</p>
                    </Col>
                    <Col md={4}>
                        <div className="booking_from">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Origin</Form.Label>
                                    <Form.Control type="test" placeholder="Select Origin" value="Dhaka"/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Destination</Form.Label>
                                        <Form.Control type="test" placeholder="Select Destination" value={name}/>
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group className="calanderImage" as={Col} controlId="formGridPassword">
                                            <Form.Label>From</Form.Label>
                                            <DatePicker className="form-control" selected ={selectDateFrom} onChange={date => setSelectDateFrom(date)} dateFormat='dd/MM/yyy'
                                            ></DatePicker>
                                            <img src={calnderIcons} alt=""/>
                                        </Form.Group>

                                        <Form.Group as={Col} className="calanderImage" controlId="formGridPassword">
                                            <Form.Label>To</Form.Label>
                                            <DatePicker className="form-control" selected ={selectDateTo} onChange={date => setSelectDateTo(date)} dateFormat='dd/MM/yyy'
                                            ></DatePicker>
                                            <img src={calnderIcons} alt=""/>
                                        </Form.Group>

                                    </Form.Row>
                                <Form.Group>
                                    <Link className="btn btn-warning w-100" to={"/location/" + locationId}>Start Booking</Link>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Booking;
