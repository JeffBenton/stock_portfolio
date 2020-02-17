import React from 'react'

import Portfolio from "../Components/Portfolio";
import NavBar from "../Components/NavBar";
import Transactions from "../Components/Transactions";

import Container from "react-bootstrap/Container";

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
                this.setState({
                    stocks: responseJSON["stocks"]
                });
            });
    };

    render() {
        return (
            <Container>
                {console.log(this.state)}
                <NavBar name={this.state.name} />
                <Portfolio stocks={this.state.stocks} balance={this.state.balance} />
            </Container>
        )
    }
}

export default ViewContainer;