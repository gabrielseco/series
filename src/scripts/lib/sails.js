import axios from 'axios'
var _url = "http://localhost:1337/"

console.log('location',window.location.href.slice(7));

/*if(window.location.href.slice(7) !== 'localhost:8000/#/'){
  _url  = "https://heroku-sails-ggseco.herokuapp.com/"
}*/


  export async function get(path) {

    const response = await axios.get(_url + path);
    return response.data;

  }

  export async function getWhere(path){
    const response = await axios.get(_url + path);
    return response.data;
  }

  export async function getOne(path, id){
    const response = await axios.get(_url + path + "/" +id);
    return response.data;
  }


  export async function add(path, obj){
    const response = await axios.post(_url + path, obj);
    return response.data;
  }

 export async function update(path, id, obj){
   const response = await axios.post(_url + path + "/" + id, obj);
   return response.data;
 }

export async  function deleteData(path, id){
   const response = await axios.delete(_url + path + "/" + id)
   return response.data;
 }
