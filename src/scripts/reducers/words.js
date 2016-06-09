import { RECEIVE_WORDS } from '../constants/ActionTypes';

const initialState = {
  words: []
};

export default function words(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_WORDS:
      return state.words = action.words;
    default:
      return state;
  }
}
