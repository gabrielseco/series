import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import {addOneFilm} from '../../actions';



class AddFilm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', films: [], obj:{}};
  }

  handleForm(e){

    e.preventDefault();

    let obj  = this.state.obj;

    if(this.state.films.length === 0){
      obj.nombre = this.refs.name.value;
    }

    const { dispatch } = this.props;


    dispatch(addOneFilm(obj, this.state.films, res => {
      if(res.id !== undefined){
        this.props.history.push('/');
      }
      this.setState({
        films: res,
        obj: res[0]
      });

    }));



  }

  updateFilm(film){
    this.refs.name.value = film.nombre;
    this.setState({
      obj: film
    });
  }

  render() {

    return(
      <div>
        <DocumentTitle title="ADD FILM"/>
        <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
                <label className="is-required">Nombre</label>
                <input ref="name" className={this.state.inputName} type="text" name="name" autoFocus required placeholder="Nombre" autoComplete="off"></input>
                <input type="submit" value="Enviar"></input>
        </form>
        <div className="films-results">
        {this.state.films.map((film, i) => {
          return(
            <img src={film.imagen} key={i} alt={film.nombre} onClick={this.updateFilm.bind(this,film)}/>
          );
        })}
        </div>
      </div>
    );
 }
}

export default connect()(AddFilm);
