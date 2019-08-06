import React, { Component } from 'react';
import Header from '../template/Header';

export class Home extends Component {
    render() {
    return (
      <React.Fragment>
        <div className="content-container home">
        <Header />
        <div className="content-home">
          Ini dashboard
        </div>

        </div>
      </React.Fragment>
    )
  }
}

export default Home
