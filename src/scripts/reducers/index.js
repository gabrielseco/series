import { combineReducers } from 'redux';
import films from './films';
import TV from './tv';
import books from './books';
import episodes from './episodes';
import words from './words';

const combinedReducer = combineReducers({
  films, TV, books, episodes, words
});
export default combinedReducer;
