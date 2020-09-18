import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SilderInfo = (props) => {
    const {name, image, id} = props.locationData;
    // console.log(props.locationData);
    return (
        <Col md={4}>
            <Link className="text-decoration-none" to={"/booking/" + id}>
                <div className="single-slide">
                    <div className="image">
                        <img src={image} alt=""/>
                        <div className="title">
                            <h2>{name}</h2>
                        </div>
                    </div>
                </div>
            </Link>
        </Col>
    );
};

export default SilderInfo;