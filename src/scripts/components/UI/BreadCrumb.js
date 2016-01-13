'use strict';

import React from 'react';


export default class BreadCrumb extends React.Component {
    constructor(props){
      super(props)
    }
    render() {

      const style = {
        verticalAlign: 'middle',
      }

      const background  = {
        background:'#'+this.props.data.color
      }



        return (
          <div className='breadcrumb' style={background}>
              <img style={style} onClick={this.props.goTo} src={this.props.data.imagen} alt={this.props.data.nombre} title={this.props.data.nombre} width="245" height="345"/>
              <div className='inline text__breadcrumb'>
                {this.props.texto}
              </div>

          </div>
        );
    }
}