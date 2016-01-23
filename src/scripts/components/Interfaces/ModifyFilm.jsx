import React from 'react';
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux';
import {modifyFilm, getOneFilm} from '../../actions'
import Colors from '../UI/Colors.js';


var fieldValues = {
  nombre: null,
  youtube: null,
  description: null,
  airdate: null,
  imagen: null,
  id: null
};

var float = {
        float: 'right'
};

class ModifyFilm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''}
  }

  componentDidMount(){
    console.log(this.props.params.id)

    const { dispatch } = this.props;

    dispatch(getOneFilm(this.props.params.id, res => {
      console.log('res ModifyFilm',res)
      this.setState({data: res});
    }))

  }

  handleForm(e){
    e.preventDefault();

    var obj = {
      id: this.props.params.id,
      nombre: this.refs.name.value,
      overview: this.refs.overview.value,
      imagen: this.refs.imagen.value,
      color: this.refs.color.value
    }

    console.log('obj ModifyFilm',obj)

    const { dispatch } = this.props;

    dispatch(modifyFilm(obj, res => {
      console.log('res modify FILM',res);
      this.props.history.push('/')
    }));



  }

  changeColor(value){
    console.log('value changed',value)
    this.refs.color.value = value.target.firstChild.data.slice(1);
  }

  render() {
    if(this.state.data !== ''){
    return(
      <div>
      <DocumentTitle title="Modify Film"/>
        <img className='img' src={this.state.data.imagen} width="230" height="345"/>
        <div style={float}>
          <Colors data={this.state.data.imagen} changeColor={this.changeColor.bind(this)}/>
        </div>
        <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
                  <label className="is-required">Nombre</label>
                  <input ref="name" className={this.state.inputName} defaultValue={this.state.data.nombre} type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
                  <textarea ref="overview" className={this.state.inputName} defaultValue={this.state.data.overview}  name="overview" placeholder="Descripcion" autoComplete="off"></textarea>
                  <input ref="imagen" className={this.state.inputName} defaultValue={this.state.data.imagen} type="text" name="imagen" required placeholder="Imagen" autoComplete="off"></input>
                  <input ref="color" className={this.state.inputName} defaultValue={this.state.data.color} type="text" name="color" placeholder="Color" autoComplete="off"></input>

                  <input type="submit" value="Enviar"></input>
          </form>
        </div>
    )
  } else {
    return (<div></div>)
  }
 }
}


export default connect()(ModifyFilm)
