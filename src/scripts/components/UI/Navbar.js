'use strict';

import React from 'react';
import {Link} from 'react-router';
import ItemNav from './ItemNav';

const UINavBar = () => (
  <div className="header">
    <div className="container">
      <ItemNav URL="/" history={history}>Films</ItemNav>
      <ItemNav URL="/tv">TV Shows</ItemNav>
      <ItemNav URL="/books">Books</ItemNav>
      <ItemNav URL="/dictionary">Words</ItemNav>
      <ItemNav URL="/d3">D3</ItemNav>

    </div>
  </div>
)



export default (UINavBar)
