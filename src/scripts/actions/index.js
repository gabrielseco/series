import films from '../api/films/index';
import TV from '../api/tv';
import books from '../api/books';
import shared from '../api/shared';
import episodes from '../api/episodes';
import * as types from '../constants/ActionTypes';


/* $RECEIVE*/

function receiveFilms(films) {
  return {
    type: types.RECEIVE_FILMS,
    films: films
  };
}

function receiveTV(TV) {
  return {
    type: types.RECEIVE_TV,
    TV: TV
  };
}

function receiveBooks(books) {
  return {
    type: types.RECEIVE_BOOKS,
    books: books
  };
}

function receiveEpisodes(episodes){
  return {
    type: types.RECEIVE_EPISODES,
    episodes: episodes
  };
}

function receiveWords(words){
  return {
    type: types.RECEIVE_WORDS,
    words: words
  };
}



/* $FILMS */

export function getAllFilms(cb) {
  return dispatch => {
    shared.get('films?sort=nombre asc',films => {
      dispatch(receiveFilms(films));
      cb(films);
    });

  };

}

export function getOneFilm(id, cb){
  return dispatch => {
    shared.getOne('films', id, film => {
      cb(film);
    });
  };
}

export function addOneFilm(obj, results, cb) {
  return dispatch => {
    films.addFilm(obj, results, film => {
      cb (film);
    });
  };
}
export function modifyFilm(obj, cb) {
  return dispatch => {
    shared.modify('films', obj, film => {
      cb (film);
    });
  };
}

export function deleteFilm(id, cb){
  return dispatch => {
    shared.delete('films', id, film => {
      cb (film);
    });
  };
}

/* $SERIES */
export function getAllTV(cb) {
  return dispatch => {
    shared.get('series/getSeries', TV => {
      cb(TV);
      dispatch(receiveTV(TV));
    });
  };
}

export function addOneTV(obj, cb) {
  return dispatch => {
    TV.addTV(obj, TV => {
      cb (TV);
    });
  };
}
export function getOneTV(obj, cb) {
  return dispatch => {
    shared.getOne('series',obj, TV => {
      cb (TV);
    });
  };
}

export function modifyTV(obj, cb) {
  return dispatch => {
    shared.modify('series',obj, TV => {
      cb (TV);
    });
  };
}

export function deleteTV(id, cb){
  return dispatch => {
    shared.delete('series',id, TV => {
      cb (TV);
    });
  };
}

/* $BOOKS */

export function getAllBooks(cb) {
  return dispatch => {
    shared.get('books', books => {
      dispatch(receiveBooks(books));
      cb(books);
    });

  };

}

export function addOneBook(obj, cb) {
  return dispatch => {
    shared.new('books', obj, book => {
      cb(book);
    });
  };
}

export function getOneBook(id, cb) {
  return dispatch => {
    shared.getOne('books', id, book => {
      cb(book);
    });
  };
}

export function modifyBook(obj, cb){
  return dispatch => {
    shared.modify('books', obj, book => {
      cb (book);
    });
  };
}

export function deleteBook(id, cb){
  return dispatch => {
    shared.delete('books', id, book => {
      cb (book);
    });
  };
}
//create the query as object stringify after putting as string shows %27% on url

export function getAllEpisodes(id, cb) {

  const $query = {
    serie:id
  };

  const $where = "?where="+JSON.stringify($query)+"&sort=numero ASC";

  return dispatch => {
    shared.findWhere('episodes', $where,  episodes => {
      dispatch(receiveEpisodes(episodes));
      cb(episodes);
    });

  };

}

export function addOneEpisode(obj, cb) {
  return dispatch => {
    shared.new('episodes',obj, episode => {
      cb (episode);
    });
  };
}

export function generateEpisodes(obj, episodesData, cb){
  let newEpisodes = [];

  return dispatch => {
    episodes.generate(obj, episodes => {

        cb(episodes);
    });
  };
}



export function getOneEpisode(id) {
  return dispatch => {
    shared.getOne('episodes', id, episode => {
      dispatch(receiveEpisodes(episode));
    });
  };
}

export function modifyEpisode(obj, cb){
  return dispatch => {
    shared.modify('episodes', obj, episode => {
      cb (episode);
    });
  };
}

export function deleteEpisode(id, cb){
  return dispatch => {
    shared.delete('episodes', id, episode => {
      cb (episode);
    });
  };
}

export function getAllWords(cb) {
  return dispatch => {
    shared.get('dictionary/getWords', words => {
      cb(words);
    });

  };

}


export function getDiccionariosPalabras(id, cb) {

  const $query = {
    peliculas: id
  };

  const $sort = "&sort=english asc";


  let $where = "?where="+JSON.stringify($query) + $sort;

  return dispatch => {
    shared.findWhere('dictionary', $where,  words => {
      cb(words);
    });

  };

}

export function getDiccionariosLibros(id, cb){
  const $query = {
    libros: id
  };

  const $sort = "&sort=english asc";

  let $where = "?where="+JSON.stringify($query) + $sort;

  return dispatch => {
    shared.findWhere('dictionary', $where,  words => {
      cb(words);
    });

  };

}

export function getDiccionariosEpisodios(id, cb){
  const $query = {
    episodios: id
  };

  const $sort = "&sort=english asc";

  let $where = "?where="+JSON.stringify($query) + $sort;

  return dispatch => {
    shared.findWhere('dictionary', $where,  words => {
      cb(words);
    });

  };

}

export function getOneWord(id, cb) {
  return dispatch => {
    shared.getOne('dictionary', id, word => {
      cb(word);
    });
  };
}

export function modifyWord(obj, cb){
  return dispatch => {
    shared.modify('dictionary', obj, word => {
      cb (word);
    });
  };
}

export function deleteWord(id, cb) {
  return dispatch => {
    shared.delete('dictionary', id, words => {
      cb (words);
    });
  };
}

function mapWords(words) {
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const newWords = [];
  words.map(word => {
    word['month'] = months[word['month'] - 1];
    newWords.push(word);
  });

  return newWords;
}

export function getWordsBetweenMonths(cb){
  return dispatch => {
    shared.get('dictionary/getWordsMonth', words => {
      cb (mapWords(words));
    });
  };
}
