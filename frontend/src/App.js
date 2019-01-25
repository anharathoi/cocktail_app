import React from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';

require('dotenv').config()


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Register/>
        < Login />
      </div>
    );
  }
}

export default App;