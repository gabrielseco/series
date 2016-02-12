  export const _apiendpoint = "https://api.themoviedb.org/3/";
  export const _api_key = "f9868bfa67c8ac93675e8de8a33cbd17";
  export const _image_path = "https://image.tmdb.org/t/p/w185";

  import { get, add, getOne, update, deleteData, getWhere } from '../../lib/sails'
  import axios from 'axios'

  const TIMEOUT = 300

  export default {
    get(path, cb, timeout) {
       var results =  get(path).then(res => {
         setTimeout(() => cb(res), timeout || TIMEOUT)
       });
    },
    findWhere(path, $where, cb , timeout){
      var results =  getWhere(path + $where).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      });
    },
    new(path, obj, cb, timeout) {
      var results =  add(path, obj).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      });
    },
    getOne(path, id, cb, timeout){
      var results =  getOne(path, id).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      });
    },
    modify(path, obj, cb, timeout){
      var results = update(path , obj.id, obj).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      })
    },
    delete(path, id, cb, timeout){
      var results = deleteData(path, id).then(res => {
        setTimeout(() => cb(res), timeout || TIMEOUT)
      })
    }
  }
