// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import routes from '../routes';

type Props = {
  store: any
}

export default class Root extends Component<void, Props, void> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
        <Router history={browserHistory}>
          {routes}
        </Router>
        </div>
      </Provider>
    );
  }
}
