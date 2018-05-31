import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import request from 'superagent'
import {compose, withStateHandlers} from 'recompose'
import {Page, Layout, Logo, Link, Header} from 'dafisha-components'

import LoginForm from 'components/LoginForm'
import {setAuthenticated} from 'actions'

import css from './PageLogin.scss'

// FIXME
// Заходим на страницу логина, логинемся и получаем эту ошибку
// Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
// in withStateHandlers(PageLogin) (created by Connect(withStateHandlers(PageLogin)))
// in Connect(withStateHandlers(PageLogin)) (created by Route)
// in Route (created by Router)

const auth = (updateErrorMessage, setAuthenticated) => data => {
  request
    .post('/login')
    .send(data)
    .set('accept', 'json')
    .end((err, res) => {
      if(err) {
        console.error(err)
        localStorage.setItem('lol', '0')
        updateErrorMessage(err.message)
        return
      }

      if(res.body.error) {
        console.error(res.body.payload.message)
        localStorage.setItem('lol', '0')
        updateErrorMessage(res.body.payload.message)
        return
      }

      // FIXME: так делать нельзя
      localStorage.setItem('lol', '1')
      updateErrorMessage(null, true)
      setAuthenticated(true)
    })
}

function PageLogin({errorMessage, updateErrorMessage, redirectToReferrer, setAuthenticated, isAuthenticated, ...props}) {
  const {from} = props.location.state || {from: {pathname: '/'}}

  if (redirectToReferrer || isAuthenticated) {
    return <Redirect to={from} />;
  }

  return (
    <Page title='Авторизация'>
      <Layout hideFooter className={css.root}>
        <LoginForm onSubmit={auth(updateErrorMessage, setAuthenticated)} errorMessage={errorMessage}/>
      </Layout>
    </Page>
  )
}

const initialState = {
  errorMessage: null,
  redirectToReferrer: false,
}

const stateUpdaters = {
  updateErrorMessage: () => (errorMessage, redirectToReferrer) => ({errorMessage, redirectToReferrer}),
}

const mapStateToProps = ({isAuthenticated}) => ({isAuthenticated})

const mapDispatchToProps = {
  setAuthenticated,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(initialState, stateUpdaters)
)(PageLogin)
