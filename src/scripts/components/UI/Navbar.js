'use strict';

import React from 'react';
import {Link} from 'react-router';


export default class UINavBar extends React.Component {
    render() {

        return (
          <div className="bar">
            <li><Link className="item" to="/">Films</Link></li>
            <li><Link className="item" to="tv">TV Shows</Link></li>
          </div>
        );
    }
}
