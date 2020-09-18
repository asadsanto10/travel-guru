import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './LocationDetails.scss'
import Rectangle26 from '../../Image/Rectangle 26.png'
import star from '../../Icon/star_1_.png';
const ShowLocationDetails = (props) => {
    const {
        image,
        name,
        guest,
        bedrooms,
        bed,
        bath,
        rating,
        ratingCount,
        price,
        total
    } = props.infoHotel;
    return (
        <Row className="pt-3">
            <Col md={6}>
                <div className="hotelImage">
                    <img style={{width: '100%'}} src={image} alt=""/>
                </div>
            </Col>
            <Col md={6}>
                <div className="hotel_info">
                    <h4>{name}</h4>
                    <div className="room_space d-flex">
                        <p>{guest} guest</p>
                        <p>{bedrooms} bedroom</p>
                        <p>{bed} bed</p>
                        <p>{bath} bacth</p>
                    </div>
                    <div className="room_condition">
                        <p>Wifi Air Conditiong Kitchen</p>
                    </div>
                    <div className="room_rate d-flex">
                        <p><img src={star} alt=""/> {rating} ({ratingCount})</p>
                        <p>${price} /night</p>
                        <p>${total} total</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ShowLocationDetails;