'use strict';

import React from 'react';
import {Link} from 'react-router';
var classNames = require('classnames');


export default class ItemNav extends React.Component {
    render() {
      var btnClass = classNames({
        'item': true,
        'item-active':this.props.URL === location.hash.slice(1)
      });

        return (
          <li><Link className={btnClass} to={this.props.URL} >{this.props.children}</Link></li>
        );
    }
}
