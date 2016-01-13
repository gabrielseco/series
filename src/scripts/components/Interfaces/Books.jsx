import React from 'react';
import {getAllBooks, deleteBook} from '../../actions'
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import Modal from 'react-modal'
import SearchInput from 'react-search-input';

import { add } from '../../lib/sails'
import axios from 'axios';




const modalStyle = {
  content : {
    height: '20%'
  }
}


class Books extends React.Component {

  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false, book: '', searchTerm: ''}
  }
  componentDidMount(){
    const {dispatch } = this.props;
    dispatch(getAllBooks())
    this.refs.search.refs.search.focus();

  }

  syncData(){
    axios.get('http://192.168.1.130:5412/web/libros').then(res => {
      console.log('res sync',res.data)
      res = res.data;
      res.map((value, i) => {
          var data = {
            id: value.ID,
            airdate:value.FechaPublicacion,
            overview: value.Descripcion,
            youtube:value.Youtube,
            nombre: value.Nombre,
            imagen: value.Foto
          }
          add('books', data, response => {
            console.log('response',response)
          });
      });


    })


  }

  addBook(){
    this.props.history.push('/addBook');
  }

  modifyBook(data){
    console.log('modifyBook',data)
    this.props.history.pushState(null,'/modifyBook/'+data.id)
  }

  remove(){
    console.log('remove',this.state.film);
    const { dispatch } = this.props;

    dispatch(deleteBook(this.state.book.id , res => {
      console.log('res DELETE BOOK',res);
      location.reload()
    }));

  }

  diccionarios(id){
    console.log(JSON.stringify(id))
    this.props.history.pushState(null,'/diccionarios_libros/'+id)
  }
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  openModal(data) {
    console.log('data',data)
    this.setState({modalIsOpen: true, book: data});
  }
  closeModal() {
    this.setState({modalIsOpen: false, book:''});
  }


  renderModal(){

    if(this.state.book === ''){
      return null
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
    )

  }

  //redux is sends the objects readonly, you have to do an action to modify the object
  //to avoid this I pass it to the component state
  //and then I can use the search component
  render() {
    const  { books } = this.props
    var list = null;
    console.log(books)





    if(books.length > 0) {
      this.state.books = books;
      if (this.state.searchTerm.length > 0) {
        var filters = ['nombre'];
        this.state.books = this.state.books.filter(this.refs.search.filter(filters));
      }
      var list = this.state.books.map((book, i) => {
        var palabras = (
          <div className="diccionarios">
              <button onClick={this.diccionarios.bind(this, book.id)}>PALABRAS</button>
          </div>
        )
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
        <div id='films' className="films">
        <SearchInput ref='search' className='search-input' onChange={this.searchUpdated.bind(this)} placeholder='Buscar...' />
          <div className="filmButton">
            <button className="addFilm" onClick={this.addBook.bind(this)}>ADD BOOK</button>
            <button onClick={this.syncData.bind(this)}> SYNC DATA</button>
          </div>
            {list}
            {this.renderModal()}
        </div>
    )
 }
}
function mapStateToProps(state) {
  return { books: state.books }
}
export default connect(mapStateToProps)(Books)
