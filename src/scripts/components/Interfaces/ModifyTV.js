// @flow
import React from 'react';
import { connect } from 'react-redux';
import { modifyTV } from '../../actions';
import { mouseTrap } from 'react-mousetrap';
import utils from 'styles/_utils.scss';
import type { BindShortcutProps, DispatchProps, HistoryProps, RouterParamsProps } from './../../types';


type TV = {
  id: number,
  nombre: string,
  overview: string,
  imagen: string,
  temporada: number,
  color: string
};

type State = {
  data: TV
};

type Props = BindShortcutProps & DispatchProps & HistoryProps & RouterParamsProps & {
  data: TV,
  bindShortcut: any,
};

type DefaultProps = {
  data: ?TV
}


class ModifyTV extends React.Component<DefaultProps, Props, State> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    data: undefined
  }

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: this.props.params.id,
        nombre: this.props.data.nombre,
        color: this.props.data.color,
        imagen: this.props.data.imagen,
        overview: this.props.data.overview,
        temporada: this.props.data.temporada
      }
    };
  }

  componentWillMount(){
    this.props.bindShortcut('esc', (e) => {
      e.preventDefault();
      this.context.router.goBack();
    });
  }

  handleForm(e){
    e.preventDefault();

    const obj: TV = {
      id: this.props.params.id,
      nombre: this.state.data.nombre,
      overview: this.state.data.overview,
      imagen: this.state.data.imagen,
      temporada: this.state.data.temporada,
      color: this.state.data.color
    };

    const { dispatch } = this.props;

    dispatch(modifyTV(obj, res => {
      this.props.history.goBack();
    }));
  }

  onChange(evt): void {
    const name: string = evt.target.name;
    const value: any = evt.target.value;
    
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
        <img className={utils.pull__left} src={this.state.data.imagen} width="230" height="345"/>
          <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
            <input value={this.state.data.nombre} type="text" name="nombre" required placeholder="Nombre" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
            <input value={this.state.data.temporada} type="text" name="temporada" required placeholder="Temporada" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
            <textarea value={this.state.data.overview}  name="overview" placeholder="Descripcion" autoComplete="off" onChange={(evt) => this.onChange(evt)}></textarea>
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
  const id: number = parseInt(props.params.id, 10);
  const { series } = state.TV;
  return {
    data: series.find((TV: TV) => TV.id === id )
  };
}

export default connect(mapStateToProps)(mouseTrap(ModifyTV));
