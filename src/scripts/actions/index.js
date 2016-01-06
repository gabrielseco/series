import films from '../api/films/index'
import TV from '../api/tv'
import * as types from '../constants/ActionTypes'

function receiveFilms(films) {
  return {
    type: types.RECEIVE_FILMS,
    films: films
  }
}

function receiveTV(TV) {
  return {
    type: types.RECEIVE_TV,
    TV: TV
  }
}

export function getAllFilms() {
  return dispatch => {
    films.getFilms(films => {
      dispatch(receiveFilms(films))
    })

  }

}



export function getOneFilm(id, cb){
  return dispatch => {
    films.getFilm(id, film => {
      cb(film)
    })
  }
}

export function addOneFilm(obj, cb) {
  return dispatch => {
    films.addFilm(obj, film => {
      cb (film)
    });
  }
}
export function modifyFilm(obj, cb) {
  return dispatch => {
    films.modifyFilm(obj, film => {
      cb (film)
    });
  }
}

export function deleteFilm(id, cb){
  return dispatch => {
    films.deleteFilm(id, film => {
      cb (film)
    });
  }
}

export function getAllTV() {
  return dispatch => {
    TV.getTV(TV => {
      dispatch(receiveTV(TV))
    })
  }
}
