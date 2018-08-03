import React from 'react';
import Register from './Register';
import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import { Login } from './Login';
import Home from './Home';


class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to = '/home'/> : <Login handleLogin = {this.props.handleLogin}/>;
    }
    getRoot = () => {
        return <Redirect to='/login' />
    }
    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to = '/login'/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path='/register' component={Register} />
                    <Route path='/login' render={this.getLogin} />
                    <Route path ='/home' render={this.getHome}/>
                    <Route path='/' render={this.getRoot} />
                </Switch>

            </div>
        );
    }
}

export default Main;