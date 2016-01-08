import { RECEIVE_EPISODES } from '../constants/ActionTypes'

const initialState = {
  episodes: []
}

export default function episodes(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_EPISODES:
      return state.episodes = action.episodes
    default:
      return state
  }
}
