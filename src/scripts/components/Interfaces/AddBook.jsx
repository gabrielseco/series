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
      youtube: this.refs.youtube.value
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
              <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
              <label className="is-required">Youtube</label>
              <input ref="youtube" className={this.state.inputName} type="text" name="youtube" placeholder="Youtube" autoComplete="off"></input>
              <input type="submit" value="Enviar"></input>
      </form>
    )
 }
}

export default connect()(AddBook)
