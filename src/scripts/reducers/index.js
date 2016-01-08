import { combineReducers } from 'redux'
import films from './films'
import TV from './tv'
import books from './books'

const combinedReducer = combineReducers({
  films, TV, books
})

export default combinedReducer
