import React from "react";
import { Link } from 'react-router-dom'

class Transactions extends React.Component {
    render() {
        return (
            <div>
                <h3>Transactions</h3>
                <p><Link to="/portfolio">portfolio</Link> | transactions</p>

                <p>BUY (APPL) - 6 shares @ $1,000</p>
                <p>BUY (APPL) - 6 shares @ $1,000</p>
                <p>BUY (APPL) - 6 shares @ $1,000</p>
                <p>BUY (APPL) - 6 shares @ $1,000</p>
                <p>BUY (APPL) - 6 shares @ $1,000</p>
                <p>BUY (APPL) - 6 shares @ $1,000</p>
            </div>
        )
    }
}

export default Transactions;