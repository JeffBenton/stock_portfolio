import React from 'react'

import Portfolio from "../Components/Portfolio";
import Transactions from "../Components/Transactions";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class ViewContainer extends React.Component {
    state = {
        id: "",
        transactions: [],
        stocks: "",
        name: "",
        balance: 0,
        ticker: "",
        quantity: "",
        logout: false,
        error: "",
        active: "portfolio"
    };

    componentDidMount() {
        const id = window.sessionStorage.getItem("id");
        const auth_token = window.sessionStorage.getItem("auth_token");

        fetch(`/api/users/${id}`, {
            headers: {
                "AUTH_TOKEN": auth_token
            }
        })
            .then(res => res.json())
            .then(responseJSON => {
                if(responseJSON["success"]) {
                    this.setState({
                        name: responseJSON["name"],
                        balance: responseJSON["balance"],
                        id: responseJSON["id"]
                    });
                    this.fetchStocks(id);
                    this.fetchTransactions(id);
                }
                else {
                    this.handleLogout();
                }
            });
    }

    fetchStocks = id => {
        fetch(`/api/stocks/${id}`, {
            headers: {
                "AUTH_TOKEN": window.sessionStorage.getItem("auth_token")
            }
        })
            .then(res => res.json())
            .then(responseJSON => {
                if(responseJSON["success"]) {
                    this.setState({
                        stocks: responseJSON["stocks"]
                    });
                }
                else {
                    this.handleLogout();
                }
            });
    };

    fetchTransactions = id => {
        fetch(`/api/transactions/${id}`, {
            headers: {
                "AUTH_TOKEN": window.sessionStorage.getItem("auth_token")
            }
        })
            .then(res => res.json())
            .then(responseJSON => {
                if(responseJSON["success"]) {
                    this.setState({
                        transactions: responseJSON["transactions"]
                    })
                }
                else {
                    this.handleLogout()
                }
            })
    };

    navigate = route => {
        if(route !== this.state.active) {
            this.setState({
                active: route
            })
        }
    };

    display = () => {
        if(this.state.active === "portfolio") {
            return (<Portfolio stocks={this.state.stocks} balance={this.state.balance} />)
        }
        else if(this.state.active === "transactions") {
            return (<Transactions transactions={this.state.transactions} />)
        }
    };

    render() {
        return (
            <Container>
                {console.log(this.state)}
                <Row>
                    <Col md={4}><h2>Hi {this.state.name}</h2></Col>
                    <Col md={{ span: 4, offset: 4 }}><p>
                        <span onClick={() => this.navigate("portfolio")} className={this.state.active === "portfolio" ? "" : "not-active"}>portfolio</span> | <
                        span onClick={() => this.navigate("transactions")} className={this.state.active === "transactions" ? "" : "not-active"}>transactions</span> | <
                        span>logout</span></p></Col>
                </Row>

                {this.display()}

            </Container>
        )
    }
}

export default ViewContainer;