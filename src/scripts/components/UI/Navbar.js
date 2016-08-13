import React from 'react';
import {Link} from 'react-router';
import ItemNav from './ItemNav';
import styles from 'styles/_header.scss';

const UINavBar = () => (
  <div className={styles.header}>
    <div className={styles.container}>
      <ItemNav URL="/" history={history}>Films</ItemNav>
      <ItemNav URL="/tv">TV Shows</ItemNav>
      <ItemNav URL="/books">Books</ItemNav>
      <ItemNav URL="/dictionary">Words</ItemNav>
      <ItemNav URL="/d3">Estadísticas</ItemNav>

    </div>
  </div>
);



export default UINavBar;
