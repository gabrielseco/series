import { RECEIVE_BOOKS, RECEIVE_BOOK } from '../constants/ActionTypes'

const initialState = {
  books: []
}

export default function books(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOOKS:
      return state.books = action.books
    default:
      return state
  }
}
