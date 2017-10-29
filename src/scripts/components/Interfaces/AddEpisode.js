// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addOneEpisode } from '../../actions';
import type { DispatchProps, HistoryProps, RouterParamsProps } from './../../types';

type Props = DispatchProps & HistoryProps & RouterParamsProps;

type State = {
  nombre: string,
  numero: string
}

export type FormAddEpisode = {
  nombre: string,
  numero: number,
  serie: number
}

class AddEpisode extends React.Component<Props, State> {
  state: State

  constructor(props, context) {
    super(props);
    this.context = context;
    this.state = {
      nombre: '',
      numero: ''
    };
  }

  componentDidMount(){
    const numberEpisode = this.props.episodes.length + 1;
    this.setState(prevState => {
      return {
        ...prevState,
        numero: numberEpisode
      };
    });
  }

  handleForm(e){
    e.preventDefault();

    const obj: FormAddEpisode = {
      nombre: this.state.nombre,
      numero: parseInt(this.state.numero, 10),
      serie: this.props.params.id
    };

    const { dispatch } = this.props;

    dispatch(addOneEpisode(obj, res => {
      this.props.history.push('/episodes/'+this.props.params.id);
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
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" role="form">
        <label className="is-required">Nombre</label>
        <input type="text" name="nombre" value={this.state.nombre} required placeholder="Nombre" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
        <label className="is-required">Número</label>
        <input type="text" name="numero" value={this.state.numero} required placeholder="Número" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
        <input type="submit" value="Enviar"></input>
      </form>
    );
 }
}

const mapStateToProps = (state, ownProps) => ({
  episodes: state.episodes
});


export default connect(mapStateToProps)(AddEpisode);
