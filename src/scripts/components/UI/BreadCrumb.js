'use strict';

import React from 'react';
import styles from 'styles/_breadcrumb.scss';
import classNames from 'classnames';


export default class BreadCrumb extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
      const breadcrumb = classNames({
        [styles.text__breadcrumb]:true,
        [styles.inline] : true
      });
      const style = {
        verticalAlign: 'middle'
      };

      const background = () => {
        let color  = null;

        if(this.props.data.color === null){
          color = '325D56';
        } else {
          color = this.props.data.color;
        }

        return {
          backgroundColor:'#'+color
        };
      };


        return (
          <div className={styles.breadcrumb} style={background()}>
              <img style={style} onClick={this.props.goTo} src={this.props.data.imagen} alt={this.props.data.nombre} title={this.props.data.nombre} width="245" height="345"/>
              <div className={breadcrumb}>
                {this.props.texto}
              </div>

          </div>
        );
    }
}
