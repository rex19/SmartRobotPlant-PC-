import React, { Component } from 'react';
import './App.css';
import 'animate.css'

class App extends Component {

  render() {
    return (
      <div className="App" >
        {this.props.children}
      </div>
    );
  }
}

export default App;
