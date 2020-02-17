import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignInForm from "./Components/SignInForm";
import RegisterForm from "./Components/RegisterForm";
import Portfolio from "./Components/Portfolio";
import Transactions from "./Components/Transactions";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/signup">
                    <RegisterForm />
                </Route>

                <Route path="/portfolio">
                    <Portfolio />
                </Route>

                <Route path="/transactions">
                    <Transactions />
                </Route>

                <Route path="/">
                    <SignInForm />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
