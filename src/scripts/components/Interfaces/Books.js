import React from 'react';
import DocumentTitle from 'react-document-title';
import {getAllBooks, deleteBook} from '../../actions';
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import Modal from 'react-modal';
import SearchInput from 'react-search-input';
import MessageInfo from '../UI/MessageInfo';
import Loading from '../UI/Loading';
import { add } from '../../lib/sails';
import axios from 'axios';




const modalStyle = {
  content : {
    height: '20%'
  }
};


class Books extends React.Component {

  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false, book: '', searchTerm: '', books: null};
  }
  componentDidMount(){
    const {dispatch } = this.props;
    dispatch(getAllBooks( books => {
      this.setState({
        books: books
      });
    }));

  }

  syncData(){
    axios.get('http://192.168.1.130:5412/web/libros').then(res => {
      res = res.data;
      res.map((value, i) => {
          const data = {
            id: value.ID,
            airdate:value.FechaPublicacion,
            overview: value.Descripcion,
            youtube:value.Youtube,
            nombre: value.Nombre,
            imagen: value.Foto
          };
          add('books', data, response => {
          });
          setTimeout(() =>{location.reload();},2500);

      });


    });


  }

  addBook(){
    this.context.router.push('/addBook');

  }

  modifyBook(data){
    this.context.router.push('/modifyBook/'+data.id);
  }

  remove(){
    const { dispatch } = this.props;

    dispatch(deleteBook(this.state.book.id , res => {
      location.reload();
    }));

  }

  diccionarios(id){
    this.context.router.push('/diccionarios_libros/'+id);

  }
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  openModal(data) {
    this.setState({modalIsOpen: true, book: data});
  }
  closeModal() {
    this.setState({modalIsOpen: false, book:''});
  }


  renderModal(){

    if(this.state.book === ''){
      return null;
    }

    return (
      <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal.bind(this)}
      style={modalStyle}>
        <h2>Desea eliminar el libro {this.state.book.nombre} ?</h2>
        <div className="buttons">
            <button className="cancel" onClick={this.closeModal.bind(this)}>Cancelar</button>
            <button className="submit" onClick={this.remove.bind(this)}>Eliminar</button>
        </div>
      </Modal>
    );

  }


  render() {
    let list = null;
    let message = null;
    let _books = this.state.books;


    if(this.state.books !== null) {
      message = this.renderMessage(this.state.books);

      if (this.state.searchTerm.length > 0) {
        const filters = ['nombre'];
        _books = this.state.books.filter(this.refs.search.filter(filters));
      }

      if(_books.length > 0){

        list = _books.map((book, i) => {
          const palabras = (
            <div className="diccionarios">
                <button onClick={this.diccionarios.bind(this, book.id)}>PALABRAS</button>
            </div>
          );
          return (
            <ListItem {...this.props} {...this.state}
                      key={book.id} data={book}
                      modify={this.modifyBook}
                      palabras={palabras}
                      openModal={this.openModal.bind(this,book)}/>
          );

        });
      }

        return(
            <div>
              <DocumentTitle title="TV"/>
              {message}
              {this.renderList(list, _books)}
              {this.renderModal(this.state.book)}
            </div>
        );
   } else {
     return <Loading/>;
   }

 }
 renderMessage(books){
    if(books.status == undefined)
       return null;

    return <MessageInfo statusCode={books.status}/>;
 }

 renderSearch(){
   return (
     <div className="search-input">
       <div className="search-wrapper">
         <span className="search-icon">⚲</span>
         <SearchInput ref="search" className="search-field" onChange={this.searchUpdated.bind(this)} placeholder="Buscar..." autoFocus />
       </div>
     </div>
   );
 }

 renderList(list, books){
   if(books.status !== 0){
     return (
       <div id="films" className="films">
       {this.renderSearch()}
         <div className="filmButton">
           <button className="addFilm" onClick={this.addBook.bind(this)}>ADD BOOK</button>
         </div>
           {list}
       </div>
     );
   }
 }
}

Books.contextTypes =  {
  router: React.PropTypes.object.isRequired
};

export default connect()(Books);
