import React from 'react';
import { connect } from 'react-redux';
import {addOneBook} from '../../actions'



class AddBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', }
  }

  handleForm(e){
    e.preventDefault();

    var obj = {
      nombre: this.refs.name.value,
      youtube: this.refs.youtube.value,
      imagen: this.refs.imagen.value,
      airdate: this.refs.airdate.value,
      overview: this.refs.overview.value,
      color: this.refs.color.value
    }

    console.log('obj addBook',obj)

    const { dispatch } = this.props;

    dispatch(addOneBook(obj, res => {
      console.log('res ADD BOOK',res);
      this.props.history.push('/books')
    }));



  }

  render() {

    return(
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
        <label className="is-required">Nombre</label>
        <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre"
               ></input>
        <label>Youtube</label>
        <input ref="youtube" className={this.state.inputName} type="text" name="youtube" placeholder="Youtube"
               ></input>
        <label className="is-required">Imagen</label>
        <input ref="imagen" className={this.state.inputName} type="text" name="photo" required placeholder="Imagen"
                ></input>
        <label className="is-required">Fecha</label>
        <input ref="airdate" className={this.state.inputName} type="text" name="airdate" required placeholder="Fecha"
                        ></input>
        <label className="is-required">Descripción</label>
        <textarea ref="overview" ></textarea>
        <input ref="color" type="text" name="color" placeholder="Color" autoComplete="off"></input>
        <input type='submit' value='ENVIAR'/>
      </form>
    )
 }
}

export default connect()(AddBook)
