import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OrganizationsContainer from './components/OrganizationsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Organizations</h1>
        </div>
        <OrganizationsContainer />
      </div>
    );
  }
}

export default App;
