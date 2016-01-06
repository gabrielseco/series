'use strict';

import React from 'react';


export default class ListItem extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {

      return (
        <div className="show-image">
            <img onClick={this.props.modify.bind(this, this.props.data)}
                 src={this.props.data.imagen}
                 title={this.props.data.Nombre}
                 alt={this.props.data.Nombre}
                 width="230"
                 height="345"/>
            <input type="button"
                   className="delete"
                   value="BORRAR"
                   onClick={this.props.openModal.bind(this, this.props.data)}>
            </input>
            {this.props.palabras}
        </div>

      );
    }
}
