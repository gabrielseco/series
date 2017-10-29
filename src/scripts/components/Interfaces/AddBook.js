// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addOneBook } from '../../actions';
import type { DispatchProps, HistoryProps } from './../../types';
import type { Book } from './../../types/App';

type State = Book

type Props = DispatchProps & HistoryProps;

class AddBook extends React.Component<Props, State> {
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      airdate: '',
      color: '',
      imagen: '',
      nombre: '',
      overview: '',
      youtube: ''
    };
  }

  handleForm(e){
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(addOneBook(this.state, res => {
      this.props.history.push('/books');
    }));
  }

  onChange(evt) {
    const { name, value } = evt.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }

  render() {

    return(
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
        <label className="is-required">Nombre</label>
        <input type="text" name="nombre" value={this.state.nombre} required placeholder="Nombre" onChange={(evt) => this.onChange(evt)}></input>
        <label>Youtube</label>
        <input type="text" name="youtube" value={this.state.youtube} placeholder="Youtube" onChange={(evt) => this.onChange(evt)}></input>
        <label className="is-required">Imagen</label>
        <input ref="imagen" type="text" name="imagen" value={this.state.imagen} required placeholder="Imagen" onChange={(evt) => this.onChange(evt)}></input>
        <label className="is-required">Fecha</label>
        <input ref="airdate" type="text" name="airdate" value={this.state.airdate} required placeholder="Fecha" onChange={(evt) => this.onChange(evt)}></input>
        <label className="is-required">Descripción</label>
        <textarea name="overview" value={this.state.overview} onChange={(evt) => this.onChange(evt)} ></textarea>
        <input type="text" name="color" value={this.state.color} placeholder="Color" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
        <input type="submit" value="ENVIAR"/>
      </form>
    );
 }
}

export default connect()(AddBook);
