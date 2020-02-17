import React from "react";
import {Link, Redirect} from 'react-router-dom'

class Transactions extends React.Component {

    state = {
        transactions: [],
        logout: false
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
                if(responseJSON["success"]) {
                    this.setState({
                        transactions: responseJSON["transactions"]
                    })
                }
                else {
                    this.handleLogout();
                }
            })
    }

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
                <h3>Transactions</h3>
                <p><Link to="/portfolio">portfolio</Link> | transactions | <Link to="#" onClick={this.handleLogout}>logout</Link></p>

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