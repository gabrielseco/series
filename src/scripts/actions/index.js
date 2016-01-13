import films from '../api/films/index'
import TV from '../api/tv'
import books from '../api/books'
import shared from '../api/shared'
import episodes from '../api/episodes'
import * as types from '../constants/ActionTypes'

/* $RECEIVE*/

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

function receiveWords(words){
  return {
    type: types.RECEIVE_WORDS,
    words: words
  }
}



/* $FILMS */

export function getAllFilms() {
  return dispatch => {
    shared.get('films?sort=nombre asc',films => {
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

/* $SERIES */
export function getAllTV() {
  return dispatch => {
    shared.get('series/getSeries', TV => {
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

/* $BOOKS */

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

export function getOneBook(id, cb) {
  return dispatch => {
    shared.getOne('books', id, book => {
      cb(book)
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

export function addOneEpisode(obj, cb) {
  return dispatch => {
    shared.new('episodes',obj, episode => {
      cb (episode)
    });
  }
}

export function generateEpisodes(obj, episodesData, cb){
  var newEpisodes = [];

  episodes.generate(obj, episodes => {
    if(episodes.length === episodesData) {
      cb("No need");
    }

  })

  return dispatch => {
    episodes.generate(obj, episodes => {

        cb(episodes);
    })
  }
}



export function getOneEpisode(id) {
  return dispatch => {
    shared.getOne('episodes', id, episode => {
      dispatch(receiveEpisodes(episode))
    });
  }
}

export function modifyEpisode(obj, cb){
  return dispatch => {
    shared.modify('episodes', obj, episode => {
      cb (episode)
    });
  }
}

export function deleteEpisode(id, cb){
  return dispatch => {
    shared.delete('episodes', id, episode => {
      cb (episode)
    });
  }
}

export function getAllWords() {
  return dispatch => {
    shared.get('dictionary?sort=english asc', words => {
      dispatch(receiveWords(words))
    })

  }

}


export function getDiccionariosPalabras(id) {

  var $query = {
    peliculas: {
      contains: id
    }
  }
  var $sort = "&sort=english asc"


  let $where = "?where="+JSON.stringify($query) + $sort;

  return dispatch => {
    shared.findWhere('dictionary', $where,  words => {
      dispatch(receiveWords(words))
    })

  }

}

export function getDiccionariosLibros(id){
  var $query = {
    libros: {
      contains: id
    }
  }
  var $sort = "&sort=english asc"

  let $where = "?where="+JSON.stringify($query) + $sort;

  return dispatch => {
    shared.findWhere('dictionary', $where,  words => {
      dispatch(receiveWords(words))
    })

  }

}

export function getDiccionariosEpisodios(id){
  var $query = {
    episodios: {
      contains: id
    }
  }
  var $sort = "&sort=english asc"

  let $where = "?where="+JSON.stringify($query) + $sort;

  return dispatch => {
    shared.findWhere('dictionary', $where,  words => {
      dispatch(receiveWords(words))
    })

  }

}

export function getOneWord(id, cb) {
  return dispatch => {
    shared.getOne('dictionary', id, word => {
      cb(word);
    });
  }
}

export function modifyWord(obj, cb){
  return dispatch => {
    shared.modify('dictionary', obj, word => {
      cb (word)
    });
  }
}

export function deleteWord(id, cb) {
  return dispatch => {
    shared.delete('dictionary', id, words => {
      cb (words)
    });
  }
}
