import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OrganizationsContainer from './components/OrganizationsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <OrganizationsContainer />
      </div>
    );
  }
}

export default App;
