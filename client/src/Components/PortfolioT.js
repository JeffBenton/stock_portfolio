import React from 'react';
import { Link, Redirect } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

class PortfolioT extends React.Component {

    state = {
        id: "",
        stocks: "",
        name: "",
        balance: 0,
        ticker: "",
        quantity: "",
        logout: false,
        error: "",
    };

    // componentDidMount() {
    //     const id = window.sessionStorage.getItem("id");
    //     const auth_token = window.sessionStorage.getItem("auth_token");
    //
    //     fetch(`/api/users/${id}`, {
    //         headers: {
    //             "AUTH_TOKEN": auth_token
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(responseJSON => {
    //             if(responseJSON["success"]) {
    //                 this.setState({
    //                     name: responseJSON["name"],
    //                     balance: responseJSON["balance"],
    //                     id: responseJSON["id"]
    //                 });
    //                 this.fetchStocks(id);
    //             }
    //             else {
    //                 this.handleLogout();
    //             }
    //         });
    // }

    // fetchStocks = id => {
    //     fetch(`/api/stocks/${id}`, {
    //         headers: {
    //             "AUTH_TOKEN": window.sessionStorage.getItem("auth_token")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(responseJSON => {
    //             this.setState({
    //                 stocks: responseJSON["stocks"]
    //             });
    //         });
    // };

    // displayStocks = () => {
    //     if(this.state.stocks === "") {
    //         return ( <p>Loading...</p>)
    //     }
    //     else if(Object.entries(this.state.stocks).length > 0) {
    //         return (
    //             <Table striped bordered hover size="sm">
    //                 <thead>
    //                 <tr>
    //                     <th>Symbol</th>
    //                     <th>Quantity</th>
    //                     <th>Price</th>
    //                     <th>Value</th>
    //                 </tr>
    //                 </thead>
    //                 <tbody>
    //                     {Object.values(this.state.stocks).map(stock => {
    //                         return (
    //                             <tr key={stock["ticker"]}>
    //                                 <td>{stock["ticker"]}</td>
    //                                 <td>{stock["quantity"]}</td>
    //                                 {this.stockPrice(stock["open"], stock["price"])}
    //                                 <td>${stock["value"].toFixed(2)}</td>
    //                             </tr>
    //                         )
    //                     })}
    //                 </tbody>
    //             </Table>
    //         )
    //     }
    //     else {
    //         return (<div>You currently own no stocks</div>)
    //     }
    // };

    // stockPrice = (open, price) => {
    //     let color = "grey";
    //     if(price > open) {
    //         color = "green"
    //     }
    //     else if(price < open) {
    //         color = "red"
    //     }
    //     return (
    //         <td style={{ color: color }}>${price}</td>
    //     )
    // };

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
                "id": this.state.id
            })
        })
            .then(res => res.json())
            .then(responseJSON => {
                if(responseJSON["success"]) {
                    this.setState({
                        ticker: "",
                        quantity: "",
                        balance: responseJSON["newBalance"]
                    });
                    this.fetchStocks(this.state.id);
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

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleLogout = () => {
        window.sessionStorage.clear();
        this.setState({
            logout: true
        });
    };

    // totalValue = () => {
    //     let total = 0;
    //     if(Object.entries(this.state.stocks).length > 0) {
    //         Object.values(this.state.stocks).forEach(stock => {
    //             total += stock["price"] * stock["quantity"]
    //         });
    //     }
    //     return (
    //         <span>(${total.toFixed(2)})</span>
    //     )
    // };

    render() {
        if(this.state.logout) {
            return (<Redirect to="/signin" />)
        }

        return (
            <Container>
                <Row>
                    <Col md={4}><h2>Hi {this.state.name}</h2></Col>
                    <Col md={{ span: 4, offset: 4 }}><p>portfolio | <Link to="/transactions">transactions</Link> | <Link to="#" onClick={this.handleLogout}>logout</Link></p></Col>
                </Row>
                <h3>Portfolio {this.totalValue()}</h3>

                {this.displayStocks()}

                <h3>Buy</h3>
                <h4>Balance: ${this.state.balance.toFixed(2)}</h4>
                <p>{this.state.error}</p>
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
            </Container>
        )
    }
}

export default Portfolio;