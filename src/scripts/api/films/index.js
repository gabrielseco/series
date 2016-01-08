/**
 * Mocking client-server processing
 */
import { get, add, getOne, update, deleteData } from '../../lib/sails'
import { _apiendpoint, _api_key, _image_path } from '../shared'
import axios from 'axios'


const TIMEOUT = 300

export default {
  getDataFilm(obj, cb){
    var name = obj.nombre.trim(),
        imagen = _image_path,
        year = null,
        idMovieDB = null,
        overview = null;

  axios.get(_apiendpoint + 'search/movie?api_key='+ _api_key +'&query='+ name).then(response => {
      console.log('res moviedb add', response);
      response = response.data;

      if(response.results.length > 0){
        name = response.results[0].original_title;
        imagen += response.results[0].poster_path;
        year = response.results[0].release_date.slice(0, 4);
        idMovieDB = response.results[0].id;
        overview = response.results[0].overview;
    }

    var data = {
     'nombre': name,
     'imagen': imagen,
     'year': Number(year),
     'idMovieDB': Number(idMovieDB),
     'overview': overview
   };

   cb(data)

  });


  },
  addFilm(obj, cb, timeout){
    this.getDataFilm(obj,function(data){
      var results = add('films', data).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      });
    })

  },
}
