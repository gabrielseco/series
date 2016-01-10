import React from 'react';
import { add } from '../../lib/sails'


class FormWords extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.refs.english.focus()
  }

  checkObject(data){

    var obj = {}

    Object.keys(data).map((value) => {
      if(data [value] === ""){
        delete data[value];
      }
    });

    return data;

  }

  fixGrammar(value){
    value = value.trim();
    value = value.charAt(0).toUpperCase() + value.slice(1);

    return value;
  }

  handleForm(e){
    e.preventDefault();

    var data = {

      english: this.fixGrammar(this.refs.english.value),
      spanish: this.fixGrammar(this.refs.spanish.value),
      peliculas: this.props.fieldValues.idPelicula,
      series: this.props.fieldValues.idSerie,
      episodios: this.props.fieldValues.idEpisodio,
      libros: this.props.fieldValues.idLibro

    }

    data = this.checkObject(data);

    console.log('data',data);

    add('dictionary', data, response => {
      console.log('response',response)
    });


    this.refs.english.value = '';
    this.refs.spanish.value = '';
    this.refs.english.focus()
  }

  finalizar(){
    this.props.history.pushState(null, 'diccionarios_pelicula/'+this.props.fieldValues.idPelicula);
  }

  render() {
    return (
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
              <input ref="english" type="text" name="english" required placeholder="English" autoComplete="off"></input>
              <input ref="spanish" type="text" name="spanish" required placeholder="Español" autoComplete="off"></input>
              <input type="submit" value="Siguiente"></input>
              <input type="button" value="Finalizar" onClick={this.finalizar.bind(this)}></input>
      </form>
    )
  }

}

export default FormWords
