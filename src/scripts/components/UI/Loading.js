'use strict';

import React from 'react';
import styles from 'styles/spinkit/_wave.scss';
import classNames from 'classnames';


const spinnerWrapper = classNames({
  [styles.sk__wave] : true
});

const rect = [];

Array.apply(null, Array(5)).forEach(function(item,index){
  const key =  `sk__rect${index + 1}`;
  const temp = classNames({
    [styles.sk__rect]:true,
    [styles[key]]:true
  })
  rect.push (<div key={index} className={temp}></div>);
});


const UILoading = () => (
        <div className={spinnerWrapper}>
          {rect.map((item, i) => {
            return item
          })}
        </div>
      );


export default UILoading;
