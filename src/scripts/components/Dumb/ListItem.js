import React from 'react';
import {VelocityComponent} from 'velocity-react';
import styles from 'styles/_films.scss';

require('velocity-animate');
require('velocity-animate/velocity.ui');

export default class ListItem extends React.Component {
    constructor(props) {
      super(props);
    }

    pulse(){
      this.refs.velocity.runAnimation();
    }

    render() {

      let animation = "callout.pulse";

      let alt = this.props.data.temporada === undefined
                ? this.props.data.nombre
                : this.props.data.nombre + " Season " + this.props.data.temporada;


      return (
        <VelocityComponent ref="velocity" animation={animation} duration={1000}>
          <div className={styles.show__image} onMouseOver={this.pulse.bind(this)}>
              <img onClick={this.props.modify.bind(this, this.props.data)}
                   src={this.props.data.imagen}
                   title={alt}
                   alt={alt}
                   width="230"
                   height="345"/>
              <input type="button"
                     className={styles.delete}
                     value="BORRAR"
                     onClick={this.props.openModal.bind(this, this.props.data)}>
              </input>
              {this.props.palabras}
          </div>
        </VelocityComponent>

      );
    }
}
