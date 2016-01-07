import React from 'react';
import {getAllFilms, deleteFilm} from '../../actions'
import axios from 'axios';
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import Modal from 'react-modal'
import SearchInput from 'react-search-input';

import { add } from '../../lib/sails'



const modalStyle = {
  content : {
    height: '20%'
  }
}


class Films extends React.Component {

  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false, film: '', searchTerm: ''}
  }
  componentDidMount(){
    const {dispatch } = this.props;
    dispatch(getAllFilms())
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

  diccionarios(){
    this.props.history.pushState(null,'/diccionarios/')
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
    const  { films } = this.props


    const palabras = (
      <div className="diccionarios">
          <button onClick={this.diccionarios.bind(this)}>PALABRAS</button>
      </div>
    )


    if(films.length > 0) {
      this.state.films = films;
      if (this.state.searchTerm.length > 0) {
        var filters = ['nombre'];
        this.state.films = this.state.films.filter(this.refs.search.filter(filters));
      }
      var list = this.state.films.map((film, i) => {
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
        <div id='films' className="films">
        <SearchInput className='search-input' ref='search' onChange={this.searchUpdated.bind(this)} placeholder='Buscar...' />
          <div className="filmButton">
            <button className="addFilm" onClick={this.addFilm.bind(this)}>ADD FILM</button>
            <button onClick={this.syncData.bind(this)}> SYNC DATA</button>
          </div>
            {list}
            {this.renderModal()}
        </div>
    )
 }
}
function mapStateToProps(state) {
  return { films: state.films }
}
export default connect(mapStateToProps)(Films)
