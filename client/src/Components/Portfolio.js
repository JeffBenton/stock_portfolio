import React from 'react';
import { Link } from 'react-router-dom'

class Portfolio extends React.Component {

    state = {
        stocks: [],
        name: "",
        balance: 0
    };

    componentDidMount() {
        const id = window.sessionStorage.getItem("id");
        fetch(`/api/user/${id}`)
            .then(res => res.json())
            .then(responseJSON => {
                this.setState({
                    stocks: responseJSON["stocks"],
                    name: responseJSON["name"],
                    balance: responseJSON["balance"]
                })
            })
    }

    displayStocks = () => {
        if(this.state.stocks) {
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
                        {this.state.stocks.map(stock => {
                            return (
                            <tr>
                            <td>{stock["ticker"]}</td>
                            <td>{stock["quantity"]}</td>
                            <td>{stock["price"]}</td>
                            <td>{stock["value"]}</td>
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

    render() {
        return (
            <div>
                <h2>Hi {this.state.name}</h2>
                <h3>Portfolio</h3>
                <p>portfolio | <Link to="/transactions">transactions</Link></p>
                <h4>Balance: ${this.state.balance}</h4>
                {this.displayStocks()}

                <h3>Buy</h3>
                <form>
                    <input type="text" placeholder="Ticker" />
                    <input type="text" placeholder="Quantity" />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Portfolio;