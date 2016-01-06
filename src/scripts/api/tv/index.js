/**
 * Mocking client-server processing
 */
import { get, add, getOne, update, deleteData } from '../../lib/sails'
import { _apiendpoint, _api_key, _image_path } from '../shared'
import axios from 'axios'



const TIMEOUT = 100

export default {
  getDataTV(obj , cb){

      var name       = obj.nombre.trim(),
          temporada  = obj.temporada.trim();
          imagen     = _image_path,
          year       = null,
          idSerie  = null,
          overview   = null;

    axios.get(_apiendpoint + 'search/tv?api_key='+ _api_key +'&query='+ name).then(response => {
        console.log('res moviedb tv add', response);
        response = response.data;

        if(response.results.length > 0){
          nombre = response.results[0].original_title;
          idSerie = response.results[0].id;
          overview = response.results[0].overview;
      }

      var data = {
       'nombre': nombre,
       'temporada': temporada,
       'imagen': imagen,
       'year': year,
       'idSerie': idSerie,
       'overview': overview
     };

     cb(data)

    });

  },
  getTV(cb, timeout) {
    var results = get('series',res => {
      setTimeout(() => cb(res), timeout || TIMEOUT)

    });
  },
  addTV(obj, cb, timeout){
    this.getDataTV(obj, data => {
      add('films', data, res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      });
    })

  },
}
