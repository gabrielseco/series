/**
 * Mocking client-server processing
 */
import { get, add, getOne, update, deleteData } from '../../lib/sails';
import { _apiendpoint, _api_key, _image_path } from '../shared';
import axios from 'axios';


const TIMEOUT = 300;

export default {
  getDataFilm(obj, cb){
    let films = [];
    let name = obj.nombre.trim(),
        imagen = null,
        year = null,
        idMovieDB = null,
        overview = null;

  axios.get(_apiendpoint + 'search/movie?api_key='+ _api_key +'&query='+ name).then(response => {
      response = response.data;

      if(response.results.length > 0){
        response.results.map((film, index) => {
          name = film.original_title;
          imagen = _image_path +  film.poster_path;
          year = film.release_date.slice(0, 4);
          idMovieDB = film.id;
          overview = film.overview;
          let data = {
           'nombre': name,
           'imagen': imagen,
           'year': Number(year),
           'idMovieDB': Number(idMovieDB),
           'overview': overview
         };
         films.push(data)
         if(index === (response.results.length -1) ){
           cb(films)
         }
        });

    }

  });


  },
  addFilm(obj, results, cb, timeout){
    if(results.length === 0){

    this.getDataFilm(obj,function(data){
      cb(data);
    })

  } else {

    const results = add('films', obj).then(res => {
      setTimeout(() => cb(res), timeout || TIMEOUT)
    });
  }

  }
}
