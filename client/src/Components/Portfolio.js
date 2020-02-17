import React from 'react';
import { Link, Redirect } from 'react-router-dom'

class Portfolio extends React.Component {

    state = {
        id: "",
        stocks: {},
        name: "",
        balance: 0,
        ticker: "",
        quantity: "",
        logout: false,
        error: ""
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

    displayStocks = () => {
        if(Object.entries(this.state.stocks).length > 0) {
            return (
                <table>
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                        {Object.values(this.state.stocks).map(stock => {
                            return (
                                <tr key={stock["ticker"]}>
                                    <td>{stock["ticker"]}</td>
                                    <td>{stock["quantity"]}</td>
                                    <td>${stock["price"]}</td>
                                    <td>${stock["value"].toFixed(2)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        }
        else {
            return (<div>You currently own no stocks</div>)
        }
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
                        error: responseJSON["error"]
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

    render() {
        if(this.state.logout) {
            return (<Redirect to="/" />)
        }

        return (
            <div>
                <h2>Hi {this.state.name}</h2>
                <h3>Portfolio</h3>
                <p>portfolio | <Link to="/transactions">transactions</Link> | <Link to="#" onClick={this.handleLogout}>logout</Link></p>
                <h4>Balance: ${this.state.balance.toFixed(2)}</h4>
                {this.displayStocks()}

                <h3>Buy</h3>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Ticker" onChange={this.handleChange} name="ticker" value={this.state.ticker} />
                    <input type="text" placeholder="Quantity" onChange={this.handleChange} name="quantity" value={this.state.quantity} />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Portfolio;