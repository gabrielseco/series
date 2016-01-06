import { RECEIVE_FILMS } from '../constants/ActionTypes'

const initialState = {
  films: []
}

export default function films(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FILMS:
      return state.films = action.films
    default:
      return state
  }
}
