import React from 'react';
import DocumentTitle from 'react-document-title'
import {getAllFilms, deleteFilm} from '../../actions'
import axios from 'axios';
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import Modal from 'react-modal'
import SearchInput from 'react-search-input';
import MessageInfo from '../UI/MessageInfo'
import Loading from '../UI/Loading'

import { add } from '../../lib/sails'



const modalStyle = {
  content : {
    height: '20%'
  }
}

const enable = () => {
    return {
    syncFilms: 0,
    syncWords: 0
  }
}


class Films extends React.Component {

  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false, film: '', searchTerm: '', films: null}
  }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(getAllFilms(films => {
      this.setState({films: films})
      this.refs.search.refs.search.focus();
    }))

  }

  checkString(data){
    var obj = {

    }

    Object.keys(data).map((value) => {
      if(data [value] === ""){
        delete data[value];
      }
    });

    return data;



  }

  syncWords(){
    axios.get('http://192.168.1.130:5412/web/diccionarios_sails').then(res => {
      res = res.data;
      res.map((value, i) => {
          var data = {
            id: value.ID,
            series: value.IDSerie,
            peliculas:value.IDPelicula,
            libros: value.IDLibro,
            episodios: value.IDEpisodio,
            english: value.english,
            spanish: value.spanish
          }
            data = this.checkString(data);
            add('dictionary', data, response => {
              console.log('response',response)
            });
            setTimeout(() =>{location.reload()},250000)

      });
    });
  }

  syncData(){
    axios.get('http://192.168.1.130:5412/web/peliculas_sails').then(res => {
      console.log('res sync',res.data)
      res = res.data;
      res.map((value, i) => {
        if(+value.Borrado === 0){
          var data = {
            id: value.ID,
            idMovieDB: value.IDMovieDB,
            year:value.Year,
            overview: value.Descripcion,
            nombre: value.Nombre,
            imagen: value.Foto
          }
          add('films', data, response => {
            console.log('response',response)
          });
          setTimeout(() =>{location.reload()},2500)

        }
      });
    })


  }

  addFilm(){
    this.props.history.push('/addFilm');
  }

  modifyFilm(data){
    console.log('modifyFilm',data)
    this.props.history.pushState(null,'/modifyFilm/'+data.id)
  }

  remove(){
    console.log('remove',this.state.film);
    const { dispatch } = this.props;

    dispatch(deleteFilm(this.state.film.id , res => {
      console.log('res DELETE FILM',res);
      location.reload()
    }));

  }

  diccionarios(id){
    this.props.history.pushState(null,'/diccionarios_pelicula/'+id)
  }
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  openModal(data) {
    console.log('data',data)
    this.setState({modalIsOpen: true, film: data});
  }
  closeModal() {
    this.setState({modalIsOpen: false, film:''});
  }


  renderModal(){

    if(this.state.film === ''){
      return null
    }

    return (
      <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal.bind(this)}
      style={modalStyle}>
        <h2>Desea eliminar la película {this.state.film.nombre} ?</h2>
        <div className="buttons">
            <button className="cancel" onClick={this.closeModal.bind(this)}>Cancelar</button>
            <button className="submit" onClick={this.remove.bind(this)}>Eliminar</button>
        </div>
      </Modal>
    )

  }

  //redux is sends the objects readonly, you have to do an action to modify the object
  //to avoid this I pass it to the component state
  //and then I can use the search component
  render() {
      var buttons = [];
      var message = null;
      var _films = this.state.films;

      if(enable.syncFilms === 1){
        buttons.push(<button key={1} onClick={this.syncData.bind(this)}> SYNC DATA</button>)
      }
      if(enable.syncWords === 1){
        buttons.push(<button key={2} onClick={this.syncWords.bind(this)}> SYNC WORDS </button>)
      }

    if(this.state.films !== null) {
      message = this.renderMessage(this.state.films)
      if (this.state.searchTerm.length > 0) {
        var filters = ['nombre'];
        _films = this.state.films.filter(this.refs.search.filter(filters));
      }

      if(_films.length > 0){

      var list = _films.map((film, i) => {
        var palabras = (
          <div className="diccionarios">
              <button onClick={this.diccionarios.bind(this, film.id)}>PALABRAS</button>
          </div>
        )
        return (
          <ListItem {...this.props} {...this.state}
                    key={film.id} data={film}
                    modify={this.modifyFilm}
                    palabras={palabras}
                    openModal={this.openModal.bind(this,film)}/>
        );

      });

     }


      return(
          <div>
            <DocumentTitle title="Films"/>
            {message}
            {this.renderList(list, _films, buttons)}
            {this.renderModal(this.state.film)}
          </div>
      )

    } else {
      return (<Loading/>)
    }
 }
 renderMessage(films){
    if(films.status == undefined)
       return null

    return <MessageInfo statusCode={films.status}/>
 }

 renderList(list, films, buttons){
   if(films.status !== 0){
     return (
       <div id='films' className="films">
       <SearchInput ref='search' className='search-input' onChange={this.searchUpdated.bind(this)} placeholder='Buscar...' />
         <div className="filmButton">
           <button className="addFilm" onClick={this.addFilm.bind(this)}>ADD FILM</button>
           {buttons}
         </div>
           {list}
       </div>
     )
   }
 }
}
export default connect()(Films)
