'use strict';

import React from 'react';
import {Link} from 'react-router';
import ItemNav from './ItemNav';

const UINavBar = () => (
  <div className="header">
    <div className="container">
      <ItemNav URL="/">Films</ItemNav>
      <ItemNav URL="/tv">TV Shows</ItemNav>
      <ItemNav URL="/books">Books</ItemNav>
      <ItemNav URL="/dictionary">Words</ItemNav>
    </div>
  </div>
)

export default UINavBar
