import React from 'react';
import DocumentTitle from 'react-document-title'
import {getAllFilms, deleteFilm} from '../../actions'
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import Modal from 'react-modal'
import SearchInput from 'react-search-input'
import MessageInfo from '../UI/MessageInfo'
import MySearchInput from '../UI/MessageInfo'
import Loading from '../UI/Loading'
import Paginator from 'react-pagify'






const modalStyle = {
  content : {
    height: '20%'
  }
}


class Films extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {modalIsOpen: false, film: '', searchTerm: '', films: null, pagination:{ page: 0, perPage: 10 }}
  }


  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(getAllFilms(films => {
      this.setState({films: films})
      console.log();
    }))

  }

  onSelect(page) {
     var pagination = this.state.pagination || {};

     pagination.page = page;

     this.setState({
         pagination: pagination
     });
 }

 onPerPage(e) {
     var pagination = this.state.pagination || {};

     pagination.perPage = parseInt(event.target.value, 10);

     this.setState({
         pagination: pagination
     });
 }

  addFilm(){
    this.context.router.push('/addFilm');
  }

  modifyFilm(data){
    this.context.router.push('/modifyFilm/'+data.id)
  }

  remove(){
    const { dispatch } = this.props;

    dispatch(deleteFilm(this.state.film.id , res => {
      console.log('res DELETE FILM',res);
      location.reload()
    }));

  }

  diccionarios(id){
    this.context.router.push('/diccionarios_pelicula/'+id)
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
      let message = null;
      let _films = this.state.films;


    if(this.state.films !== null) {
      message = this.renderMessage(this.state.films)
      if (this.state.searchTerm.length > 0) {
        var filters = ['nombre'];
        _films = this.state.films.filter(this.refs.search.filter(filters));
      }

      if(_films.length > 0){

      _films = Paginator.paginate(_films, this.state.pagination);


      var list = _films.data.map((film, i) => {
        var palabras = (
          <div className="diccionarios">
              <button onClick={this.diccionarios.bind(this, film.id)}>PALABRAS</button>
          </div>
        );

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
            {this.renderList(list, _films)}
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

 renderSearch(){
   return (
     <div className='search-input'>
       <div className='search-wrapper'>
         <span className="search-icon">⚲</span>
         <SearchInput ref='search' className='search-field' onChange={this.searchUpdated.bind(this)} placeholder='Buscar...' autoFocus />
       </div>
     </div>
   )
 }

 renderList(list, films){
   if(films.status !== 0){
     return (
       <div id='films' className="films">
          {this.renderSearch()}
         <div className="filmButton">
           <button className="addFilm" onClick={this.addFilm.bind(this)}>ADD FILM</button>
         </div>

           {list}
           <br/>
           <div className='pagination'>
               <Paginator
                   page={films.page}
                   pages={films.amount}
                   beginPages={3}
                   endPages={3}
                   onSelect={this.onSelect.bind(this)}>
              </Paginator>
           </div>
       </div>
     )
   }
 }
}

Films.contextTypes =  {
  router: React.PropTypes.object.isRequired
};

export default connect()(Films)
