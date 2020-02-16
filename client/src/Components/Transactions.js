import React from "react";
import { Link } from 'react-router-dom'

class Transactions extends React.Component {

    state = {
        transactions: []
    };

    componentDidMount() {
        const user_id = window.sessionStorage.getItem("id");
        fetch(`/api/transactions/${user_id}`)
            .then(res => res.json())
            .then(responseJSON => {
                this.setState({
                    transactions: responseJSON
                })
            })
    }

    render() {
        return (
            <div>
                <h3>Transactions</h3>
                <p><Link to="/portfolio">portfolio</Link> | transactions</p>

                {this.state.transactions.map(t => {
                    return (
                        <p key={t.id}>BUY ({t.ticker}) - {t.quantity} shares @ ${t.price}</p>
                    )
                })}
            </div>
        )
    }
}

export default Transactions;