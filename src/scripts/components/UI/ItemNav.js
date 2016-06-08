'use strict';

import React, { PropTypes } from 'react';
import {Link} from 'react-router';
const classNames = require('classnames');


const ItemNav = ( { URL, children, disable }) => {
  const active = {
    paddingBottom:'20px',
    borderBottom:'2px #000 solid',
    fontWeight:400
  };
  const btnClass = classNames({
    'item': true
  });
  const hidden = classNames({
    'hidden': disable
  });

  return(
    <li className={hidden}> <Link activeClassName="active" className={btnClass} activeStyle={active} to={URL} > {children} </Link> </li>
  );
};

ItemNav.propTypes = {
  URL: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};


export default ItemNav;
