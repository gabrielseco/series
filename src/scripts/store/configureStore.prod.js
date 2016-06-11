import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers';
import persistState from 'redux-localstorage';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
  const middleware = [ thunk ]


const createPersistentStore = compose(
  applyMiddleware(...middleware),
  persistState(),
)(createStore);

const store = createPersistentStore(combinedReducer, initialState);


return store;
}
