import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Transactions = props => {
    return (
        <>
            <Col md={4}><h3>Transactions</h3></Col>

            {props.transactions.map(t => {
                let plural = t.quantity > 1 ? "s" : "";
                return (
                    <Row key={t.id}><p>BUY ({t.ticker}) - {t.quantity} share{plural} @ ${t.price}</p></Row>
                )
            })}
        </>
    )
};

export default Transactions;