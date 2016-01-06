import { RECEIVE_TV } from '../constants/ActionTypes'

const initialState = {
  TV: []
}

export default function TV (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TV:
      return state.TV = action.TV
    default:
      return state
  }
}
