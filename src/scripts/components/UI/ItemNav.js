'use strict';

import React, { PropTypes } from 'react';
import {Link} from 'react-router';
const classNames = require('classnames');
import styles from 'styles/_header.scss';

const ItemNav = ( { URL, children, disable }) => {

  const hidden = classNames({
    [styles.hidden]: disable
  });

  return(
    <li className={hidden}>
      <Link activeClassName={styles.item__active}
            className={styles.item}
            to={URL} > {children} </Link>
    </li>
  );
};

ItemNav.propTypes = {
  URL: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default ItemNav;
