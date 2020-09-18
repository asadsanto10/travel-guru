import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import location from '../../Data/locationData';
import ShowLocationDetails from './ShowLocationDetails';
import './LocationDetails.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';

const LocatianDetails = () => {
    const {hotelinfo} = useParams();
    const matcData = location.find(lo => lo.id === parseInt(hotelinfo));
    const hotelinfoData = matcData.hotelInfo;
    
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    return (
        <Container>
            <div className="locationDetails pt-5">
                <div className="stay">
                    {
                    loggedinUser.name ?
                    <h2 className="pb-3">Welcome {loggedinUser.name}</h2> 
                    : 
                    <h2>Welcome {loggedinUser.email}</h2>
                    }
                    <h2>Stay in {matcData.name}</h2>
                </div>
                <Row>
                    <Col md={6}>
                        <div className="hotelinfo pt-4">
                            {
                                hotelinfoData.map(data => <ShowLocationDetails infoHotel = {data}></ShowLocationDetails>)
                            }
                        </div>
                    </Col>
                    <Col md={6}>
                        <iframe className="map" src={matcData.map}></iframe>
                    </Col>
                </Row>
                
            </div>
        </Container>
    );
};

export default LocatianDetails;