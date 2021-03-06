import axios from 'axios';
const _url = getURL();

function getURL() {

    if (window.location.host === 'localhost:8000') {
        return location.protocol + "//" + 'localhost:1337' + "/";
    }
    if (window.location.host === 'localhost:1337') {
        return location.protocol + "//" + 'localhost:1337' + "/";
    }
    return "https://" + window.location.host + "/";

}

function getPromise(path) {
    return new Promise(function(resolve, reject) {
        axios.get(_url + path).then(response => {
            resolve(response);
        }).catch(error => {
            return reject(error);
        });
    });
}

export async function get(path) {

    try {
      const response = await getPromise(path);
      return response.data;

    } catch (error) {

        return error;
    }

}

export async function getWhere(path) {

    try {
      const response = await getPromise(path);
      return response.data;

    } catch (error) {
      return error;
    }

}

export async function getOne(path, id) {

    try {
      const response = await getPromise(path + "/" + id);
      return response.data;

    } catch (error) {
      return error;
    }

}


export async function add(path, obj) {
    const response = await axios.post(_url + path, obj);
    return response.data;
}

export async function update(path, id, obj) {
    const response = await axios.post(_url + path + "/" + id, obj);
    return response.data;
}

export async function deleteData(path, id) {
    const response = await axios.delete(_url + path + "/" + id);
    return response.data;
}
