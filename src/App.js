import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';


class HelloMessage extends React.Component {
  render() {
    return <div>Hello <b>{this.props.name}</b></div>;
  }
}

export default HelloMessage;
