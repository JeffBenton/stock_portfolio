import React from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from "react-bootstrap/Col";

/*
    Handles stock purchasing
    Successful stock purchases will be stored and immediately displayed on
    the portfolio and transactions pages
 */

class StocksForm extends React.Component {
    state = {
        ticker: "",
        quantity: "",
        error: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        fetch('/api/buy', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "AUTH_TOKEN": window.sessionStorage.getItem("auth_token")
            },
            body: JSON.stringify({
                "ticker": this.state.ticker,
                "quantity": this.state.quantity,
                "id": this.props.id
            })
        })
            .then(res => res.json())
            .then(responseJSON => {
                if(responseJSON["success"]) {
                    this.setState({
                        ticker: "",
                        quantity: "",
                        error: ""
                    });
                    this.props.handlePurchase(responseJSON["newBalance"])
                }
                else {
                    this.setState({
                        error: responseJSON["error"],
                        ticker: "",
                        quantity: ""
                    })
                }
            });
    };

    render() {
        return (
            <>
                <h3>Buy</h3>
                <h4>Balance: ${this.props.balance.toFixed(2)}</h4>
                <p style={{ color: "red" }}>{this.state.error}</p>
                <Form onSubmit={this.handleSubmit}>
                    <Col md={4}><Form.Group>
                        <Form.Control type="text" placeholder="Ticker" name="ticker" value={this.state.ticker} onChange={this.handleChange}/>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group>
                        <Form.Control type="text" placeholder="Quantity" name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
                    </Form.Group></Col>
                    <Col><Button variant="primary" type="submit">
                        Buy
                    </Button></Col>
                </Form>
            </>
        )
    }
}

export default StocksForm;