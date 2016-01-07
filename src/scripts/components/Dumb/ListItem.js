'use strict';

import React from 'react';


export default class ListItem extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      let alt = this.props.data.temporada === undefined
                ? this.props.data.nombre
                : this.props.data.nombre + " Season " + this.props.data.temporada
      return (
        <div className="show-image">
            <img onClick={this.props.modify.bind(this, this.props.data)}
                 src={this.props.data.imagen}
                 title={alt}
                 alt={alt}
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
