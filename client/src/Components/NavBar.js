import React from 'react';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const NavBar = props => {
    return (
        <div>
            <Row>
                <Col md={4}><h2>Hi {props.name}</h2></Col>
                {/*<Col md={{ span: 4, offset: 4 }}><p>portfolio | <Link to="/transactions">transactions</Link> | <Link to="#" onClick={this.handleLogout}>logout</Link></p></Col>*/}
            </Row>
        </div>
    )
};

export default NavBar;