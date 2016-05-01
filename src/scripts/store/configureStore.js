import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import combinedReducer from '../reducers'
import persistState from 'redux-localstorage'

export default function configureStore(initialState) {
  const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const createPersistentStore = compose(
  applyMiddleware(...middleware),
  persistState()
)(createStore)

const store = createPersistentStore(combinedReducer, initialState);


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
