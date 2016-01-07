import React from 'react';
import { connect } from 'react-redux';
import {addOneFilm} from '../../actions'



class AddFilm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', }
  }

  handleForm(e){
    e.preventDefault();

    var obj = {
      nombre: this.refs.name.value
    }

    console.log('obj addFilm',obj)

    const { dispatch } = this.props;

    dispatch(addOneFilm(obj, res => {
      console.log('res ADD FILM',res);
      this.props.history.push('/')
    }));



  }

  render() {

    return(
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
              <label className="is-required">Nombre</label>
              <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
              <input type="submit" value="Enviar"></input>
      </form>
    )
 }
}

export default connect()(AddFilm)
