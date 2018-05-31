import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import App from './App'
import configureStore from './store/configureStore'
import initialState from './initialState'
import history from './history'

const store = configureStore(initialState)
const rootEl = document.getElementById('root')

function renderApp() {
  ReactDOM.render(
    <App
      store={store}
      history={history}
    />,
    rootEl
  )
}

moment.locale('ru')

renderApp()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', renderApp)
}
