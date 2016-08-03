import React from 'react';
import {Route, IndexRoute, useRouterHistory} from 'react-router';

import D3 from '../components/Interfaces/D3';
import App from '../components/Interfaces/App';
import Films from '../components/Interfaces/Films';
import AddFilm from '../components/Interfaces/AddFilm';
import ModifyFilm from '../components/Interfaces/ModifyFilm';

import TV from '../components/Interfaces/TV';
import AddTV from '../components/Interfaces/AddTV';
import ModifyTV from '../components/Interfaces/ModifyTV';

import Books from '../components/Interfaces/Books';
import AddBook from '../components/Interfaces/AddBook';
import ModifyBook from '../components/Interfaces/ModifyBook';

import Episodes from '../components/Interfaces/Episodes';
import AddEpisode from '../components/Interfaces/AddEpisode';
import ModifyEpisode from '../components/Interfaces/ModifyEpisode';


import Words                     from '../components/Interfaces/Words';
import DiccionarioPeliculas from '../components/Interfaces/DiccionarioPeliculas';
import DiccionarioEpisodios      from '../components/Interfaces/DiccionarioEpisodios';
import DiccionarioLibros         from '../components/Interfaces/DiccionariosLibros';

import AddWords   from '../components/Interfaces/AddWords';
import ModifyWord from '../components/Interfaces/ModifyWord';



export default (
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
);
