/**
 * Mocking client-server processing
 */
import { get, add, getOne, update, deleteData } from '../../lib/sails';
import { _apiendpoint, _api_key, _image_path } from '../shared';
import axios from 'axios';


const TIMEOUT = 300;

export default {
   async getData(obj){
     const api = await axios.get(_apiendpoint + 'tv/'+obj.idSerie+'/season/'+obj.temporada+'?api_key='+_api_key + "");
     let episodes = api.data.episodes;
     let data = [];

    for(let i = 0; i < episodes.length; i++ ){

      if(episodes[i].name !== ''){
        const episode = {
          serie: obj.id,
          nombre: episodes[i].name,
          overview: episodes[i].overview,
          numero: episodes[i].episode_number,
          airdate: episodes[i].air_date
        };
        data.push(episode);
      }

    }
    return data;
  },
  generate(obj, cb, timeout){
    this.getData(obj).then(data => {
      for(let i = 0; i < data.length; i++){
        const results = add('episodes', data[i]).then(res => {
        });
        setTimeout(()=> {
          cb(true);
        },2000);
      }


    });

  }
};
