import React from 'react';
import { connect } from 'react-redux';
import {modifyTV} from '../../actions';
import {mouseTrap} from 'react-mousetrap';
import  {find} from 'lodash';

//import Colors from '../UI/Colors.js';

const float = {
        float: 'right'
};



class ModifyTV extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

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
      temporada: this.refs.temporada.value,
      color: this.refs.color.value
    };

    const { dispatch } = this.props;

    dispatch(modifyTV(obj, res => {
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
      {/*
      <div style={float}>
      <Colors data={this.props.data.imagen} changeColor={this.changeColor.bind(this)}/>
      </div>*/}
        <img className="img" src={this.props.data.imagen} width="230" height="345"/>
          <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
                  <label className="is-required">Nombre</label>
                  <input ref="name" className={this.state.inputName} defaultValue={this.props.data.nombre} type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
                  <input ref="temporada" className={this.state.inputName} defaultValue={this.props.data.temporada} type="text" name="temporada" required placeholder="Temporada" autoComplete="off"></input>
                  <textarea ref="overview" className={this.state.inputName} defaultValue={this.props.data.overview}  name="overview" placeholder="Descripcion" autoComplete="off"></textarea>
                  <input ref="imagen" className={this.state.inputName} defaultValue={this.props.data.imagen} type="text" name="ref" required placeholder="Imagen" autoComplete="off"></input>
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
      data: find(state.TV, {id: Number(props.params.id)})
  };
}


export default connect(mapStateToProps)(mouseTrap(ModifyTV));
