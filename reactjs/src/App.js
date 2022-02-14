import './App.css';
import {LoginPage} from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { history } from './helpers';
import React, { Component } from 'react';
import { Router, Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from './actions';
import { PrivateRoute } from './components';
class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        // history.listen((location, action) => {
        //     // clear alert on location change
        //     dispatch(alertActions.clear());
        // });
    }
   

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute path="/" component={HomePage} />
                </Switch>
            </Router>
        );
    }
}


function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 