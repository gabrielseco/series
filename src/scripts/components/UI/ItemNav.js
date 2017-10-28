// @flow
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from 'styles/_header.scss';

type Props = {
  children: string,
  disable: boolean,
  URL: string,
}

const ItemNav = ( { URL, children, disable }: Props) => {

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

export default ItemNav;
