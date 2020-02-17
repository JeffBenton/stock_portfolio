import React from 'react'

import Table from 'react-bootstrap/Table'

/*
    A display component for the portfolio page
    Props are received from the ViewContainer
 */

const Portfolio = props => {

    const displayStocks = () => {
        if(props.stocks === "") {
            return ( <p>Loading...</p>)
        }
        else if(Object.entries(props.stocks).length > 0) {
            return (
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(props.stocks).map(stock => {
                        return (
                            <tr key={stock["ticker"]}>
                                <td>{stock["ticker"]}</td>
                                <td>{stock["quantity"]}</td>
                                {stockPrice(stock["open"], stock["price"])}
                                <td>${stock["value"].toFixed(2)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            )
        }
        else {
            return (<div>You currently own no stocks</div>)
        }
    };

    const totalValue = () => {
        let total = 0;
        if(Object.entries(props.stocks).length > 0) {
            Object.values(props.stocks).forEach(stock => {
                total += stock["price"] * stock["quantity"]
            });
        }
        return (
            <span>(${total.toFixed(2)})</span>
        )
    };

    const stockPrice = (open, price) => {
        let color = "grey";
        if(price > open) {
            color = "green"
        }
        else if(price < open) {
            color = "red"
        }
        return (
            <td style={{ color: color }}>${price}</td>
        )
    };

    return (
        <>
            <h3>Portfolio {totalValue()}</h3>

            {displayStocks()}
        </>
    )
};

export default Portfolio;