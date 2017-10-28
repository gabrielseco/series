import React from 'react';
import DocumentTitle from 'react-document-title';
import {getAllFilms, deleteFilm} from '../../actions';
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import Modal from 'react-modal';
import SearchInput from 'react-search-input';
import MessageInfo from '../UI/MessageInfo';
import Loading from '../UI/Loading';
import Paginator from 'react-pagify';
import {mouseTrap} from 'react-mousetrap';
import styles from 'styles/_films.scss';
import searchStyles from 'styles/_search.scss';
import paginationStyles from 'styles/_pagination.scss';
import modalStyles from 'styles/_modals.scss';

import classNames from 'classnames';



const modalStyle = {
  content : {
    height: '20%'
  }
};


class Films extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {modalIsOpen: false, film: '', searchTerm: '', films: null, pagination:{ page: 0, perPage: 10 }};
  }

  componentWillMount(){
    this.props.bindShortcut(['ctrl+e','command+e'], (e) => {
      e.preventDefault();
      this.addFilm();
    });

    const { dispatch } = this.props;
    dispatch(getAllFilms(films => {
        this.setState({films: films});
      }));

  }


  onSelect(page) {
     let pagination = this.state.pagination || {};

     pagination.page = page;

     this.setState({
         pagination: pagination
     });
 }

 onPerPage(e) {
     let pagination = this.state.pagination || {};

     pagination.perPage = parseInt(event.target.value, 10);

     this.setState({
         pagination: pagination
     });
 }

  addFilm(){
    this.props.history.push('/addFilm');
  }

  modifyFilm(data){
    this.props.history.push('/modifyFilm/'+data.id);
  }

  remove(){
    const { dispatch } = this.props;

    dispatch(deleteFilm(this.state.film.id , res => {
      location.reload();
    }));

  }

  diccionarios(id){
    this.props.history.push('/diccionarios_pelicula/'+id);
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  openModal(data) {
    this.setState({modalIsOpen: true, film: data});
  }
  closeModal() {
    this.setState({modalIsOpen: false, film:''});
  }


  renderModal(){

    if(this.state.film === ''){
      return null;
    }

    return (
      <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal.bind(this)}
      style={modalStyle}>
        <h2>Desea eliminar la película {this.state.film.nombre} ?</h2>
        <div className={modalStyles.buttons}>
            <button className={modalStyles.cancel} onClick={this.closeModal.bind(this)}>Cancelar</button>
            <button className={modalStyles.submit} onClick={this.remove.bind(this)}>Eliminar</button>
        </div>
      </Modal>
    );

  }

  renderList(list, films){
    const composedStyles = classNames({
      [paginationStyles.pagify__pagination]:true,
      [paginationStyles.pagination]:true
    });
    if(films.status !== 0){
      return (
        <div>
           {this.renderSearch()}
          <div className={styles.filmButton}>
            <button className={styles.addFilm} onClick={this.addFilm.bind(this)}>ADD FILM</button>
          </div>

            {list}
            <br/>
            <div className={composedStyles}>
                <Paginator
                    activeClassName={paginationStyles.selected}
                    page={films.page}
                    pages={films.amount}
                    beginPages={3}
                    endPages={3}
                    onSelect={this.onSelect.bind(this)}/>
            </div>
        </div>
      );
    }
  }

  renderSearch(){
    return (
      <div className={searchStyles.search__input}>
        <div className={searchStyles.search__wrapper}>
          <span className={searchStyles.search__icon}>⚲</span>
          <SearchInput ref="search" className={styles.search__field} onChange={this.searchUpdated.bind(this)} placeholder="Buscar..." autoFocus />
        </div>
      </div>
    );
  }

  renderMessage(films){
     if(films.status == undefined)
        return null;

     return <MessageInfo statusCode={films.status}/>;
  }

  //redux is sends the objects readonly, you have to do an action to modify the object
  //to avoid this I pass it to the component state
  //and then I can use the search component
  render() {
      let message = null;
      let _films = this.state.films;
      let list   = null;

    if(_films !== null) {
      message = this.renderMessage(_films);
      if (this.state.searchTerm.length > 0) {
        const filters = ['nombre'];
        _films = _films.filter(this.refs.search.filter(filters));
      }

      if(_films.length > 0){

      _films = Paginator.paginate(_films, this.state.pagination);


      list = _films.data.map((film, i) => {
        const palabras = (
          <div className={styles.diccionarios}>
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
      );

    } else {
      return (<Loading/>);
    }
 }
}
function mapStateToProps(state, props) {
  return {
    films: state.films
  };
}

Films.getDefaultProps = {
  films: []
};

export default connect(mapStateToProps)(mouseTrap(Films));
