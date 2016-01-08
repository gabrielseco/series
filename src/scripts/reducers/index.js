import { combineReducers } from 'redux'
import films from './films'
import TV from './tv'
import books from './books'
import episodes from './episodes'

const combinedReducer = combineReducers({
  films, TV, books, episodes
})

export default combinedReducer
