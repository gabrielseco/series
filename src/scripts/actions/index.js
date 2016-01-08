import films from '../api/films/index'
import TV from '../api/tv'
import books from '../api/books'
import shared from '../api/shared'
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

function receiveBooks(books) {
  return {
    type: types.RECEIVE_BOOKS,
    books: books
  }
}

function receiveEpisodes(episodes){
  return {
    type: types.RECEIVE_EPISODES,
    episodes: episodes
  }
}

export function getAllFilms() {
  return dispatch => {
    shared.get('films',films => {
      dispatch(receiveFilms(films))
    })

  }

}

export function getOneFilm(id, cb){
  return dispatch => {
    shared.getOne('films', id, film => {
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
    shared.modify('films', obj, film => {
      cb (film)
    });
  }
}

export function deleteFilm(id, cb){
  return dispatch => {
    shared.delete('films', id, film => {
      cb (film)
    });
  }
}

export function getAllTV() {
  return dispatch => {
    shared.get('series', TV => {
      dispatch(receiveTV(TV))
    })
  }
}

export function addOneTV(obj, cb) {
  return dispatch => {
    TV.addTV(obj, TV => {
      cb (TV)
    });
  }
}
export function getOneTV(obj, cb) {
  return dispatch => {
    shared.getOne('series',obj, TV => {
      cb (TV)
    });
  }
}

export function modifyTV(obj, cb) {
  return dispatch => {
    shared.modify('series',obj, TV => {
      cb (TV)
    });
  }
}

export function deleteTV(id, cb){
  return dispatch => {
    shared.delete('series',id, TV => {
      cb (TV)
    });
  }
}

export function getAllBooks() {
  return dispatch => {
    shared.get('books', books => {
      dispatch(receiveBooks(books))
    })

  }

}

export function addOneBook(obj, cb) {
  return dispatch => {
    books.addBook(obj, book => {
      cb (book)
    });
  }
}

export function getOneBook(id) {
  return dispatch => {
    shared.getOne('books', id, book => {
      dispatch(receiveBooks(book))
    });
  }
}

export function modifyBook(obj, cb){
  return dispatch => {
    shared.modify('books', obj, book => {
      cb (book)
    });
  }
}

export function deleteBook(id, cb){
  return dispatch => {
    shared.delete('books', id, book => {
      cb (book)
    });
  }
}
//create the query as object stringify after putting as string shows %27% on url

export function getAllEpisodes(id) {

  var $query = {
    serie:{
      contains: id
    }
  }

  let $where = "?where="+JSON.stringify($query);

  return dispatch => {
    shared.findWhere('episodes', $where,  episodes => {
      dispatch(receiveEpisodes(episodes))
    })

  }

}
