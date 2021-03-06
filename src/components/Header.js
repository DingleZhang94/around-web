import React from 'react';
import logo from '../assets/logo.svg';
import {Icon} from 'antd';
import PropTypes from 'prop-types';

class Header extends React.Component {
    static propTypes ={
        isLoggedIn : PropTypes.bool.isRequired,
        handleLogout: PropTypes.func.isRequired,
    }

    render(){
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Around</h1>
                <div className ='pusher'/>
                {this.props.isLoggedIn ? <a className = 'logout' onClick = {this.props.handleLogout}>
                                    <Icon type ='logout'/>{'  '}Log out</a>:''}
            </header>
        );
    }
}

export default Header;