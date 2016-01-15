import React from 'react';
import { connect } from 'react-redux';
import {modifyBook, getOneBook} from '../../actions'
import Colors from '../UI/Colors.js';

var fieldValues = {
}
var float = {
        float: 'right'
};

class ModifyBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''}
  }

  componentDidMount(){

    const { dispatch } = this.props;


    dispatch(getOneBook(this.props.params.id, res => {
      this.setState({data: res})
    }))


  }

  handleForm(e){
    e.preventDefault();

    var obj = {
      id: this.props.params.id,
      nombre: this.refs.name.value,
      overview: this.refs.overview.value,
      youtube: this.refs.youtube.value,
      airdate: this.refs.airdate.value,
      imagen: this.refs.imagen.value,
      color: this.refs.color.value
    }

    const { dispatch } = this.props;

    dispatch(modifyBook(obj, res => {
      console.log('res modify BOOK',res);
      this.props.history.push('/books')
    }));

  }

  changeColor(value){
    console.log('value changed',value)
    this.refs.color.value = value.target.firstChild.data.slice(1);
  }

  render() {
    if(this.state.data !== ''){
      fieldValues = this.state.data

      return(
        <div>
          <img ref='imagen' className='img' src={fieldValues.imagen} width="230" height="345"/>
          <div style={float}>
            <Colors data={fieldValues.imagen} changeColor={this.changeColor.bind(this)}/>
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
              <input type='submit' value='ENVIAR'/>
            </form>
          </div>
      )
    } else {
    return (<div></div>)
   }

  }
}

function mapStateToProps(state) {
  return { books: state.books }
}
export default connect(mapStateToProps)(ModifyBook)
