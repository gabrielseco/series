import React from 'react';
import { connect } from 'react-redux';
import {modifyBook, getOneBook} from '../../actions';
//import Colors from '../UI/Colors.js';
import find from 'lodash/find';
import {mouseTrap} from 'react-mousetrap';
import utils from 'styles/_utils.scss';

let fieldValues = {
};
const float = {
        float: 'right'
};

class ModifyBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''};
  }

  componentWillMount(){

    const { dispatch } = this.props;


    dispatch(getOneBook(this.props.params.id, res => {
      this.setState({data: res});
    }));


  }

  handleForm(e){
    e.preventDefault();

    let obj = {
      id: this.props.params.id,
      nombre: this.refs.name.value,
      overview: this.refs.overview.value,
      youtube: this.refs.youtube.value,
      airdate: this.refs.airdate.value,
      imagen: this.refs.imagen.value,
      color: this.refs.color.value
    };

    const { dispatch } = this.props;

    dispatch(modifyBook(obj, res => {
      this.props.history.goBack();
    }));

  }

  changeColor(value){
    this.refs.color.value = value.target.firstChild.data.slice(1);
  }

  render() {
    if(this.props.boook !== ''){
      fieldValues = this.props.book;

      return(
        <div>
          <img ref="imagen" className={utils.pull__left} src={fieldValues.imagen} width="230" height="345"/>
          <div style={float}>
            {/*<Colors data={fieldValues.imagen} changeColor={this.changeColor.bind(this)}/>*/}
          </div>
            <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
              <label className="is-required">Nombre</label>
              <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre"
                     defaultValue={fieldValues.nombre}></input>
              <label>Youtube</label>
              <input ref="youtube" className={this.state.inputName} type="text" name="youtube" placeholder="Youtube"
                     defaultValue={fieldValues.youtube}></input>
              <label className="is-required">Imagen</label>
              <input ref="imagen" className={this.state.inputName} type="text" name="photo" required placeholder="Imagen"
                      defaultValue={fieldValues.imagen}></input>
              <label className="is-required">Fecha</label>
              <input ref="airdate" className={this.state.inputName} type="text" name="airdate" required placeholder="Fecha"
                              defaultValue={fieldValues.airdate}></input>
              <label className="is-required">Descripción</label>
              <textarea ref="overview" defaultValue={fieldValues.overview}></textarea>
              <input ref="color" defaultValue={fieldValues.color} type="text" name="color" placeholder="Color" autoComplete="off"></input>
              <input type="submit" value="ENVIAR"/>
            </form>
          </div>
      );
    } else {
    return (<div></div>);
   }

  }
}

function mapStateToProps(state, props) {
  return { book: find(state.books, {id: Number(props.params.id)}) };
}
export default connect(mapStateToProps)(ModifyBook);
