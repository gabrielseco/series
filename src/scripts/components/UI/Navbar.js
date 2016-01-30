'use strict';

import React from 'react';
import {Link} from 'react-router';
var classNames = require('classnames');
import ItemNav from './ItemNav';

export default class UINavBar extends React.Component {
    render() {
        return (
          <div className="header">
            <div className="container">
              <ItemNav URL="/">Films</ItemNav>
              <ItemNav URL="/tv">TV</ItemNav>
              <ItemNav URL="/books">Books</ItemNav>
              <ItemNav URL="/dictionary">Words</ItemNav>
            </div>
          </div>
        );
    }
}
