import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import configureStore from './store/configureStore'
import history from './history'
import App from './App'

const store = configureStore()
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
