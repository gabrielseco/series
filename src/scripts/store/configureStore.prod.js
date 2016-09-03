import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers';
import persistState from 'redux-localstorage';

export default function configureStore(initialState) {

const createPersistentStore = compose(
  applyMiddleware(thunk),
  persistState()
)(createStore);

const store = createPersistentStore(combinedReducer, initialState);


return store;
}
