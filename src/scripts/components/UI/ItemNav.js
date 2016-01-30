'use strict';

import React, { PropTypes } from 'react'
import {Link} from 'react-router';
var classNames = require('classnames');


const ItemNav = ( { URL, children }) => {

  var btnClass = classNames({
    'item': true,
    'item-active': URL === location.hash.slice(1)
  });

  return(
    <li> <Link className={ btnClass } to={ URL } > { children } </Link> </li>
  )
}

ItemNav.propTypes = {
  URL: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default ItemNav
