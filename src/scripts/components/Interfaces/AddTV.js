// @flow
import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import {addOneTV} from '../../actions';
import type { DispatchProps, HistoryProps } from './../../types';


export type AddTVState = {
  nombre: string,
  temporada: string
}

type Props = DispatchProps & HistoryProps;

class AddTV extends React.Component<void, Props, AddTVState> {

  state: AddTVState;

  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      temporada: ''
    };
  }

  handleForm(e){
    e.preventDefault();

    const obj: AddTVState = {
      nombre: this.state.nombre,
      temporada: this.state.temporada
    };

    const { dispatch } = this.props;

    dispatch(addOneTV(obj, res => {
      this.props.history.push('/tv');
    }));
  }

  onChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }

  render() {
    return(
      <div>
        <DocumentTitle title="Add TV"/>
        <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
          <label className="is-required">Nombre</label>
          <input type="text" value={this.state.nombre} name="nombre" autoFocus required placeholder="Nombre" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
          <label className="is-required">Temporada</label>
          <input type="text" value={this.state.temporada} name="temporada" required placeholder="Temporada" onChange={(evt) => this.onChange(evt)}></input>
          <input type="submit" value="Enviar"></input>
        </form>
      </div>
      );
  }
}

export default connect()(AddTV);
