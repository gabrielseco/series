import { RECEIVE_TV } from '../constants/ActionTypes';

const initialState = {
  series: []
};

export default function TV (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TV:
      return {
        ...state,
        series: action.series
      };
    default:
      return state;
  }
}
