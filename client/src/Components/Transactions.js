import React from "react";
import { Link } from 'react-router-dom'

class Transactions extends React.Component {

    state = {
        transactions: []
    };

    componentDidMount() {
        const user_id = window.sessionStorage.getItem("id");
        const auth_token = window.sessionStorage.getItem("auth_token");
        fetch(`/api/transactions/${user_id}`, {
            headers: {
                "AUTH_TOKEN": auth_token
            }
        })
            .then(res => res.json())
            .then(responseJSON => {
                console.log(responseJSON);
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