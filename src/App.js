import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    }
  }


  render() {
    return (
      <div className="App" style={this.state.style}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
