import React from 'react';
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux';
import {addOneTV} from '../../actions'



class AddTV extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', }
  }


  handleForm(e){
    e.preventDefault();

    var obj = {
      nombre: this.refs.name.value,
      temporada: this.refs.temporada.value
    }

    const { dispatch } = this.props;

    dispatch(addOneTV(obj, res => {
      console.log('res ADD TV',res);
      this.props.history.push('/tv')
    }));





  }

  render() {

    return(
      <div>
      <DocumentTitle title="Add TV"/>
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
              <label className="is-required">Nombre</label>
              <input ref="name" className={this.state.inputName} type="text" name="name" autoFocus required placeholder="Nombre" autoComplete="off"></input>
              <label className="is-required">Temporada</label>
              <input ref="temporada" className={this.state.inputName} type="text" name="temporada" required placeholder="Temporada"></input>
              <input type="submit" value="Enviar"></input>
      </form>
      </div>

      );
}
}

export default connect()(AddTV)
