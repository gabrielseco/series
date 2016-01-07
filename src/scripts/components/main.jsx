import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Router, Route} from 'react-router'
import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'

import App from './Interfaces/App.jsx';
import Films from './Interfaces/Films.jsx';
import AddFilm from './Interfaces/AddFilm.jsx';
import ModifyFilm from './Interfaces/ModifyFilm.jsx';

import TV from './Interfaces/TV.jsx';
import AddTV from './Interfaces/AddTV.jsx';
import ModifyTV from './Interfaces/ModifyTV.jsx';



var history = createHistory({
  queryKey: false
});

const store = configureStore()

try {

  require('../styles/main.scss');

  render((
    <Provider store={store}>
      <Router history={history}>
        <Route component={App}>
          <Route
          path="/"
          name="films"
          component={Films}
          />
          <Route
          path="/tv"
          name="TV"
          component={TV}
          />
          <Route
          path="/addFilm"
          name="addFilm"
          component={AddFilm}
          />
          <Route
          path="/modifyFilm/:id"
          name="modifyFilm"
          component={ModifyFilm}
          />
          <Route
          path="/addTV"
          name="addTV"
          component={AddTV}
          />
          <Route
          path="/modifyTV/:id"
          name="ModifyTV"
          component={ModifyTV}
          />

        </Route>
      </Router>
    </Provider>
  ), document.getElementById('app'))
} catch(e) {
  ReactDOM.render(
    <div>
    <h2>Error: application could not load</h2>
    <pre>
    <strong>{e.toString()}</strong>
    {!!e.stack && (<div><br />{e.stack}</div>)}
    </pre>
    </div>, document.body
  );

  throw e;
}
