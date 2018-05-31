import React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

import Router from './Router'

import 'dafisha-components/src/styles/reset.css'
import 'dafisha-components/src/styles/index.css'

export default function Root({
  store,
  history,
}) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <Router/>
        </AppContainer>
      </ConnectedRouter>
    </Provider>
  )
}
