import React from 'react';
import logo from '../assets/logo.svg';

const header = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Around</h1>
        </header>
    );
}

export default header;