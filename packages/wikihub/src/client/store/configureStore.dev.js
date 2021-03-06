/* eslint-disable */

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'

import history from '../history'
import rootReducer from '../reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const configureStore = preloadedState => {
  const loggerMiddleware = createLogger()

  const enhancer = composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      loggerMiddleware,
    ),
    // other store enhancers if any
  );

  const store = createStore(rootReducer, preloadedState, enhancer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
