import { combineReducers } from 'redux'
import films from './films'
import TV from './tv'

const combinedReducer = combineReducers({
  films,TV
})

export default combinedReducer
