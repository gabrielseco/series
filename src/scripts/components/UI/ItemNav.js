'use strict';

import React, { PropTypes } from 'react'
import {Link} from 'react-router';
var classNames = require('classnames');


const ItemNav = ( { URL, children }) => {
  var active = {
    paddingBottom:'20px',
    borderBottom:'2px #000 solid',
    fontWeight:400
  }
  var btnClass = classNames({
    'item': true,
  });

  return(
    <li> <Link activeClassName="active" className={ btnClass } activeStyle={active} to={ URL } > { children } </Link> </li>
  )
}

ItemNav.propTypes = {
  URL: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}


export default ItemNav
