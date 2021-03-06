import { get, add, getOne, update, deleteData } from '../../lib/sails';
import { _apiendpoint, _api_key, _image_path } from '../shared';
import axios from 'axios';

const TIMEOUT = 300;

const _apiBooks = 'https://www.googleapis.com/books/v1/volumes';

export default {
  async getDataBook(obj){

  let qry = "?q="+obj.nombre;

  let books = await axios.get(_apiBooks + qry);

  let arrayOfBooks = new Array();

  for( let i = 0; i < books.data.items.length; i++) {

    if(obj.nombre === books.data.items[i].volumeInfo.title ) {

      const data ={
        nombre:books.data.items[i].volumeInfo.title,
        overview:books.data.items[i].volumeInfo.description,
        imagen: books.data.items[i].volumeInfo.imageLinks.thumbnail,
        youtube: obj.youtube,
        airdate: books.data.items[i].volumeInfo.publishedDate
      };


      //return data;

    }
  }
},
  addBook(obj, cb, timeout){
    this.getDataBook(obj).then(data => {
      add('books', data).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT);
      });
    });
  }
};
