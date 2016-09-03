import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import {modifyFilm} from '../../actions';
import Colors from '../UI/Colors.js';
import _ from 'lodash';
import {mouseTrap} from 'react-mousetrap';
import utils from 'styles/_utils.scss';




let fieldValues = {
  nombre: null,
  youtube: null,
  description: null,
  airdate: null,
  imagen: null,
  id: null
};

const float = {
        float: 'right'
};

class ModifyFilm extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''};
  }

  componentWillMount(){

    this.props.bindShortcut('esc', (e) => {
      e.preventDefault();
      this.context.router.goBack();
    });

  }

  handleForm(e){
    e.preventDefault();

    const obj = {
      id: this.props.params.id,
      nombre: this.refs.name.value,
      overview: this.refs.overview.value,
      imagen: this.refs.imagen.value,
      color: this.refs.color.value
    };

    const { dispatch } = this.props;

    dispatch(modifyFilm(obj, res => {
      this.props.history.goBack();
    }));



  }

  changeColor(value){
    this.refs.color.value = value.target.firstChild.data.slice(1);
  }

  render() {
    if(this.props.data !== ''){
    return(
      <div>
      <DocumentTitle title="Modify Film"/>
        <img className={utils.pull__left} src={this.props.data.imagen} width="230" height="345"/>
        {/*
        <div style={float}>
          <Colors data={this.state.data.imagen} changeColor={this.changeColor.bind(this)}/>
        </div>*/}
        <form onSubmit={this.handleForm.bind(this)} id="addFilm" role="form">
                  <label className="is-required">Nombre</label>
                  <input ref="name" className={this.state.inputName} defaultValue={this.props.data.nombre} type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
                  <textarea ref="overview" className={this.state.inputName} defaultValue={this.props.data.overview}  name="overview" placeholder="Descripcion" autoComplete="off"></textarea>
                  <input ref="imagen" className={this.state.inputName} defaultValue={this.props.data.imagen} type="text" name="imagen" required placeholder="Imagen" autoComplete="off"></input>
                  <input ref="color" className={this.state.inputName} defaultValue={this.props.data.color} type="text" name="color" placeholder="Color" autoComplete="off"></input>

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
  return {
    data: _.find(state.films, {id: Number(props.params.id)})
  };
}


export default connect(mapStateToProps)(mouseTrap(ModifyFilm));
