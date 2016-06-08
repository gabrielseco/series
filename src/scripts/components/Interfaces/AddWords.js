import React from 'react';
import DocumentTitle from 'react-document-title'
import FormWords from './FormWords';
import { connect } from 'react-redux';
import {modifyFilm, getOneFilm, getOneBook, getOneTV} from '../../actions';
import {mouseTrap} from 'react-mousetrap';




var fieldValues = {
  idPelicula: '',
  idSerie: '',
  idEpisodio: '',
  idLibro: '',
  english:'',
  spanish: ''
}


class AddWords extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  constructor(props,context){
    super(props,context)
    this.state = {form: '', data: ''}
  }

  componentWillMount(){
    var idPelicula = +this.props.params.pelicula;
    var idSerie = +this.props.params.serie;
    var idEpisodio = +this.props.params.episodio;
    var idLibro = +this.props.params.libro;
    this.props.bindShortcut(['ctrl+e','command+e'], (e) => {
      e.preventDefault();
      if(idPelicula !== 0){
        this.finalizarPelicula();
      }
      if(idSerie !== 0){
        this.finalizarSerie();
      }
      if(idLibro != 0){
        this.finalizarLibro();
      }
    });
  }

  componentDidMount(){
    var idPelicula = +this.props.params.pelicula;
    var idSerie = +this.props.params.serie;
    var idEpisodio = +this.props.params.episodio;
    var idLibro = +this.props.params.libro;


    if(idPelicula !== 0){
      fieldValues.idPelicula = idPelicula;
      const { dispatch } = this.props;

      dispatch(getOneFilm(fieldValues.idPelicula, res => {
        this.setState({data: res, form: 1});
      }))

    }

    if(idSerie !== 0) {
      fieldValues.idSerie = idSerie;
      fieldValues.idEpisodio = idEpisodio;

      const { dispatch } = this.props;

      dispatch(getOneTV(fieldValues.idSerie, res => {
        this.setState({data: res, form: 3});
      }))

    }

    if (idLibro !== 0) {
      fieldValues.idLibro = idLibro;
      const { dispatch } = this.props;

      dispatch(getOneBook(fieldValues.idLibro, res => {
        this.setState({data: res, form: 2});
      }))
    }

  }
  finalizarPelicula(){
    this.context.router.push('/diccionarios_pelicula/'+this.props.params.pelicula);
  }
  finalizarLibro(){
    this.context.router.push('/diccionarios_libros/'+this.props.params.libro);
  }

  finalizarSerie(){
    this.context.router.push('/diccionarios/'+this.props.params.serie+'/episodio/'+this.props.params.episodio);

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
      case 3:
        form = <FormWords {...this.props} fieldValues={fieldValues} finalizar={this.finalizarSerie.bind(this)}/>
        break;
    }


    return (
      <div>
        <DocumentTitle title="Add Words"/>
        <img className='img' width="230" height="345" src={this.state.data.imagen} alt={this.state.data.nombre} title={this.state.data.nombre}/>
        {form}
      </div>
    )
  }

}

export default connect()(mouseTrap(AddWords))
