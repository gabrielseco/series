import React from 'react';
import FormWords from './FormWords';
import { connect } from 'react-redux';
import {modifyFilm, getOneFilm, getOneBook} from '../../actions'



var fieldValues = {
  idPelicula: '',
  idSerie: '',
  idEpisodio: '',
  idLibro: '',
  english:'',
  spanish: ''
}


class AddWords extends React.Component {

  constructor(props){
    super(props)
    this.state = {form: '', data: ''}
  }

  componentDidMount(){
    var idPelicula = +this.props.params.pelicula;
    var idLibro = +this.props.params.libro;

    if(idPelicula !== undefined){
      fieldValues.idPelicula = idPelicula;
      const { dispatch } = this.props;

      dispatch(getOneFilm(fieldValues.idPelicula, res => {
        console.log('res film',res)
        this.setState({data: res, form: 1});
      }))

    }

    if (idLibro !== undefined) {
      fieldValues.idLibro = idLibro;
      const { dispatch } = this.props;

      dispatch(getOneBook(fieldValues.idLibro, res => {
        console.log('res film',res)
        this.setState({data: res, form: 2});
      }))
    }

  }
  finalizarPelicula(){
    this.props.history.pushState(null, 'diccionarios_pelicula/'+this.props.params.pelicula);
  }
  finalizarLibro(){
    this.props.history.pushState(null, 'diccionarios_libros/'+this.props.params.libro);

  }

  render(){
    var form = null
    switch(+this.state.form){
      case 1:
        form = <FormWords {...this.props} fieldValues={fieldValues} finalizar={this.finalizarPelicula.bind(this)}/>
        break;
      case 2:
        form = <FormWords {...this.props} fieldValues={fieldValues} finalizar={this.finalizarLibro.bind(this)}/>

        break;
    }


    return (
      <div>
        <img className='img' width="230" height="345" src={this.state.data.imagen} alt={this.state.data.nombre} title={this.state.data.nombre}/>
        {form}
      </div>
    )
  }

}

export default connect()(AddWords)
