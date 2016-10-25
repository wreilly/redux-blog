import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';

// import App from './components/app';
import reducers from './reducers';
import routes from './routes';


/*
Let's get the REDUX-DEVTOOLS-EXTENSION in place (for Chrome DevTools)
From AndrewMeadUdemyCourse: /store/configureStore.jsx
https://github.com/zalmoxisus/redux-devtools-extension#usage

var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
*/

// const createStoreWithMiddleware = applyMiddleware(
//   promise
// )(createStore);
const myStore = createStore(reducers, compose(
  applyMiddleware(promise),
  window.devToolsExtension ? window.devToolsExtension() : f => f));

ReactDOM.render(
  <Provider store={myStore}>
{/*   <Provider store={createStoreWithMiddleware(reducers)}>

      <App /> */}
    <Router
      history={browserHistory}
      routes={routes}
    />
  </Provider>
  , document.querySelector('.container'));
