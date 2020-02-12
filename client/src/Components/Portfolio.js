import React from 'react';

class Portfolio extends React.Component {
    render() {
        return (
            <div>
                <h3>Portfolio</h3>
                <p>portfolio | transactions</p>
                <h4>Total: $5000</h4>

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
                    <tr>
                        <td>AAPL</td>
                        <td>6</td>
                        <td>$1,000</td>
                        <td>$6,000</td>
                    </tr>
                    <tr>
                        <td>TSLA</td>
                        <td>10</td>
                        <td>$700</td>
                        <td>$7,000</td>
                    </tr>
                    <tr>
                        <td>BYND</td>
                        <td>20</td>
                        <td>$100</td>
                        <td>$2,000</td>
                    </tr>
                    </tbody>
                </table>

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