import React, { Component, PropTypes } from 'react'
import DocumentTitle from 'react-document-title'
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
        <DocumentTitle title="LEARN WORDS"/>
        <div className='main'>
          {this.props.children}
        </div>
      </div>
    );
  }
}





export default App
