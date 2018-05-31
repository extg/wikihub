import React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

import Router from './Router'

import 'dafisha-components/src/styles/reset.css'
import 'dafisha-components/src/styles/index.css'

export default function App({
  store,
  history,
}) {
  return (
    <Provider store={store}>
        <AppContainer>
          <Router history={history}/>
        </AppContainer>
    </Provider>
  )
}
