import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router';
import UINavBar from '../UI/Navbar';
import styles from 'styles/_films.scss';

 class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <UINavBar/>
        <DocumentTitle title="LEARN WORDS"/>
        <div className={styles.main}>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default App;
