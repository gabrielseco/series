/**
 * Mocking client-server processing
 */
import { get, add, getOne, update, deleteData } from '../../lib/sails'
import { _apiendpoint, _api_key, _image_path } from '../shared'
import axios from 'axios'



const TIMEOUT = 100

export default {
  async getDataTV(obj){

      var nombre       = obj.nombre.trim(),
          temporada  = obj.temporada.trim(),
          imagen     = _image_path,
          year       = null,
          idSerie  = null,
          overview   = null;

      var response = await axios.get(_apiendpoint + 'search/tv?api_key='+ _api_key +'&query='+ nombre);
          response = response.data;


       if(response.results.length > 0) {
         nombre   = response.results[0].original_name;
         idSerie  = response.results[0].id;
         overview = response.results[0].overview


         var responseImg = await axios.get(_apiendpoint + 'tv/'+idSerie+'?api_key='+ _api_key +'&query='+ nombre);
         responseImg = responseImg.data;


         for(var i = 0; i < responseImg.seasons.length; i++){

           if(responseImg.seasons[i].season_number.toString() === temporada){
             var idSeason = responseImg.seasons[i].id;
             var imagen = _image_path + responseImg.seasons[i].poster_path;
             var year = responseImg.seasons[i].air_date.slice(0, 4);
           }

         }

         var data = {
           nombre: nombre,
           temporada: temporada,
           imagen: imagen,
           year: year,
           idSerie: idSerie,
           idSeason: idSeason,
           overview: overview
         };

         return data;
      }

  },
  getTVS(cb, timeout) {
    var results =  get('series/getSeries').then(res => {
      setTimeout(() => cb(res), timeout || TIMEOUT)
    });
  },
  getTV(id, cb, timeout){
    var results =  getOne('series', id).then(res => {
      setTimeout(() => cb(res), timeout || TIMEOUT)
    });

  },
  addTV(obj, cb, timeout){
    this.getDataTV(obj).then(data => {
      add('series', data).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      });
    })


  },
  modifyTV(obj, cb, timeout){
    update('series',obj.id, obj).then(res => {
      setTimeout(() => cb(res), timeout || TIMEOUT)
    })
  },
  deleteTV(id, cb, timeout){
    deleteData('series',id).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
    });

  },
}
