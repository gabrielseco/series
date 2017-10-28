// @flow
/**
 * Mocking client-server processing
 */
import { get, add, getOne, update, deleteData } from '../../lib/sails';
import { _apiendpoint, _api_key, _image_path } from '../shared';
import axios from 'axios';
import type { AddTVState } from './../../components/Interfaces/AddTV';

const TIMEOUT = 100;

export default {
  async getDataTV(obj: AddTVState){

      let nombre       = obj.nombre.trim(),
          temporada    = obj.temporada.trim(),
          imagen       = _image_path,
          year         = null,
          idSerie      = null,
          idSeason     = null,
          overview     = null;

      let response = await axios.get(_apiendpoint + 'search/tv?api_key='+ _api_key +'&query='+ nombre);
          response = response.data;


       if(response.results.length > 0) {
         nombre   = response.results[0].original_name;
         idSerie  = response.results[0].id;
         overview = response.results[0].overview;


         let responseImg = await axios.get(_apiendpoint + 'tv/'+idSerie+'?api_key='+ _api_key +'&query='+ nombre);
         responseImg = responseImg.data;


         for(let i = 0; i < responseImg.seasons.length; i++){

           if(responseImg.seasons[i].season_number.toString() === temporada){
              idSeason = responseImg.seasons[i].id;
              imagen = _image_path + responseImg.seasons[i].poster_path;
              year = responseImg.seasons[i].air_date.slice(0, 4);
           }

         }

         let data = {
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
  addTV(obj: AddTVState, cb: Function, timeout: number) {
    this.getDataTV(obj).then(data => {
      add('series', data).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT);
      });
    });
  }
};
