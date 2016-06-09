import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import D3 from './Interfaces/D3';


import App from './Interfaces/App';
import Films from './Interfaces/Films';
import AddFilm from './Interfaces/AddFilm';
import ModifyFilm from './Interfaces/ModifyFilm';

import TV from './Interfaces/TV';
import AddTV from './Interfaces/AddTV';
import ModifyTV from './Interfaces/ModifyTV';

import Books from './Interfaces/Books';
import AddBook from './Interfaces/AddBook';
import ModifyBook from './Interfaces/ModifyBook';

import Episodes from './Interfaces/Episodes';
import AddEpisode from './Interfaces/AddEpisode';
import ModifyEpisode from './Interfaces/ModifyEpisode';


import Words                     from './Interfaces/Words';
import DiccionarioPeliculas from './Interfaces/DiccionarioPeliculas';
import DiccionarioEpisodios      from './Interfaces/DiccionarioEpisodios';
import DiccionarioLibros         from './Interfaces/DiccionariosLibros';

import AddWords   from './Interfaces/AddWords';
import ModifyWord from './Interfaces/ModifyWord';


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });



const store = configureStore();

try {

  require('../styles/main.scss');


  render((
    <Provider store={store}>
      <Router history={appHistory}>
        <Route component={App}>
          <Route
          path="/"
          >
            <IndexRoute
            component={Films}
            />
            <Route
            path="/addFilm"
            component={AddFilm}
            />
            <Route
            path="/modifyFilm/:id"
            component={ModifyFilm}
            />
            <Route
            path="/diccionarios_pelicula/:id"
            component={DiccionarioPeliculas}
            />
          </Route>

          <Route
          path="/tv">
            <IndexRoute
            component={TV}
            />
            <Route
            path="/addTV"
            component={AddTV}
            />
            <Route
            path="/modifyTV/:id"
            component={ModifyTV}
            />
            <Route
            path="/episodes/:id"
            component={Episodes}
            />
            <Route
            path="/diccionarios/:idSerie/episodio/:idEpisodio"
            component={DiccionarioEpisodios}
            />
            <Route
            path="/addEpisode/:id"
            component={AddEpisode}
            />
            <Route
            path="/modifyEpisode/:idSerie/:idEpisodio"
            name="modifyEpisode"
            component={ModifyEpisode}
            />

          </Route>
          <Route
          path="/books">
            <IndexRoute
            component={Books}
            />

            <Route
            path="/addBook"
            name="addBook"
            component={AddBook}
            />
            <Route
            path="/modifyBook/:id"
            name="modifyBook"
            component={ModifyBook}
            />

            <Route
            path="/diccionarios_libros/:id"
            name="diccionariolibros"
            component={DiccionarioLibros}
            />

          </Route>
          <Route
          path="/dictionary"
          name="words"
          component={Words}
          />
          <Route
          path="/d3"
          name="d3"
          component={D3}
          />


          <Route
          path="/addWords/:pelicula/:serie/:episodio/:libro"
          name="addWords"
          component={AddWords}
          />
          <Route
          path="/modifyWord/:id"
          name="modifyWord"
          component={ModifyWord}
          />
        </Route>
      </Router>
    </Provider>), document.getElementById('app'));
} catch(e) {
  render(
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
