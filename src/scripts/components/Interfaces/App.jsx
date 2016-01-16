import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router';
import UINavBar from '../UI/NavBar';

 class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <UINavBar/>
        <div className='main'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App
