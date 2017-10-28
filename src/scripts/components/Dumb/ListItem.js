// @flow
import React from 'react';
import { VelocityComponent } from 'velocity-react';
import styles from 'styles/_films.scss';
require('velocity-animate');
require('velocity-animate/velocity.ui');

type Props = {
  palabras: string,
  data: {
    imagen: string,
    nombre: string,
    temporada: ?string,
  },
  modify: Function,
  openModal: Function  
}

export default class ListItem extends React.Component<void, Props, void> {
    velocity: any
    height: number = 345;
    width: number = 230
    constructor(props: Props) {
      super(props);
    }

    pulse(){
      this.velocity.runAnimation();
    }

    render() {

      const animation = "callout.pulse";

      const temporada = this.props.data.temporada ? this.props.data.temporada : '';

      let alt = this.props.data.temporada === undefined
                ? this.props.data.nombre
                : this.props.data.nombre + " Season " + temporada;

      return (
        <VelocityComponent ref={input => this.velocity = input} animation={animation} duration={1000}>
          <div className={styles.show__image} onMouseOver={this.pulse.bind(this)}>
              <img onClick={this.props.modify.bind(this, this.props.data)}
                   src={this.props.data.imagen}
                   title={alt}
                   alt={alt}
                   width={this.width}
                   height={this.height}/>
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
