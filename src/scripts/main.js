import React from 'react';
import { render } from 'react-dom';
const Root = require('./containers/Root').default;

let configureStore, store = null;

if(process.env.NODE_ENV === 'development'){
  configureStore  = require('./store/configureStore.dev').default;
  store = configureStore();
  
} else {
  configureStore = require('./store/configureStore.prod').default;
  store = configureStore();
}

try {

  require('./styles/main.scss');

  console.log('store',store);


  render(<Root store={store}/>, document.getElementById('app'));
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
