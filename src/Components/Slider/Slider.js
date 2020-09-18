import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import location from '../../Data/locationData';
import SilderInfo from './SilderInfo';
import './Slider.scss';
const Slider = () => {
    const getLocationData = location;
    const [locationData, setLocationData] = useState(getLocationData);
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    return (
        <section className="slider">
            <Container>
                {
                    loggedinUser.name ?
                    <h2 className="pb-3">Welcome {loggedinUser.name}</h2> 
                    : 
                    <h2>Welcome {loggedinUser.email}</h2>
                }
                <Row>
                    <Col md={4}>
                    <div className="info">
                        <h2>Cox bazar</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem temporibus dolorem doloremque enim facere quas adipisci reprehenderit? Impedit debitis adipisci consequatur iusto. Porro sunt dolorum unde, aperiam molestiae doloribus adipisci.</p>
                        <Button variant="warning">Booking</Button>
                    </div>
                    </Col>
                    <Col md={8}>
                        <div className="slide">
                            <Row>
                                {
                                    locationData.map(data => <SilderInfo locationData = {data} key = {data.id}></SilderInfo>)
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>  
    );
};

export default Slider;