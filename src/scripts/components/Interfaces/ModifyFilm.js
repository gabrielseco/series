// @flow
import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { modifyFilm } from '../../actions';
import { mouseTrap } from 'react-mousetrap';
import utils from 'styles/_utils.scss';
import type { Film } from './../../types/App';
import type { BindShortcutProps, DispatchProps, HistoryProps, RouterParamsProps } from './../../types';

type DefaultProps = {
  data: ?Film
}

type Props = BindShortcutProps & DispatchProps & HistoryProps & RouterParamsProps;

type State = {
  data: Film
}

class ModifyFilm extends React.Component<DefaultProps, Props, State> {
  state: State
  
  static defaultProps = {
    data: undefined
  }
  
  constructor(props) {
    super(props);
    this.state = {
      data: {
        color: this.props.data.color,
        imagen: this.props.data.imagen,
        nombre: this.props.data.nombre,        
        overview: this.props.data.overview
      }
    };
  }

  componentWillMount(){
    this.props.bindShortcut('esc', (e) => {
      e.preventDefault();
      this.props.history.goBack();
    });
  }

  handleForm(e){
    e.preventDefault();

    const obj = {
      id: this.props.params.id,
      nombre: this.state.data.nombre,
      overview: this.state.data.overview,
      imagen: this.state.data.imagen,
      color: this.state.data.color
    };

    const { dispatch } = this.props;

    dispatch(modifyFilm(obj, res => {
      this.props.history.goBack();
    }));
  }

  onChange(evt){
    const { name, value } = evt.target;
    this.setState(prevState => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [name]: value
        }
      };
    });
  }

  render() {
    if(this.state.data !== undefined){
    return(
      <div>
      <DocumentTitle title="Modify Film"/>
        <img className={utils.pull__left} src={this.state.data.imagen} width="230" height="345"/>
        <form onSubmit={this.handleForm.bind(this)} id="addFilm" role="form">
          <label className="is-required">Nombre</label>
          <input value={this.state.data.nombre} type="text" name="nombre" required placeholder="Nombre" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
          <textarea value={this.state.data.overview} name="overview" placeholder="Descripcion" autoComplete="off" onChange={(evt) => this.onChange(evt)}></textarea>
          <input value={this.state.data.imagen} type="text" name="imagen" required placeholder="Imagen" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
          <input value={this.state.data.color} type="text" name="color" placeholder="Color" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
          <input type="submit" value="Enviar"></input>
          </form>
        </div>
    );
  } else {
    return (<div></div>);
  }
 }
}

function mapStateToProps(state, props) {
  const films = state.films;
  const id = parseInt(props.params.id, 10);
  return {
    data: films.find(film => film.id === id)
  };
}


export default connect(mapStateToProps)(mouseTrap(ModifyFilm));
