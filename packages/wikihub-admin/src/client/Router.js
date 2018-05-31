import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'
import {
  Switch,
  BrowserRouter,
  // Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import PageOffers from './pages/PageOffers'
import PageNewOffer from './pages/PageNewOffer'
import PageEditOffer from './pages/PageEditOffer'
import PageLogin from './pages/PageLogin'
// import PageNotFound from './pages/PageNotFound'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

function Router({history, isAuthenticated}) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <PrivateRoute exact path='/' component={PageOffers} isAuthenticated={isAuthenticated}/>
        <PrivateRoute exact path='/offers' component={PageOffers} isAuthenticated={isAuthenticated}/>
        <PrivateRoute exact path='/offers/new' component={PageNewOffer} isAuthenticated={isAuthenticated}/>
        <PrivateRoute exact path='/offers/:id' component={PageEditOffer} isAuthenticated={isAuthenticated}/>
        <PrivateRoute exact path='/offers/:id/edit' component={PageEditOffer} isAuthenticated={isAuthenticated}/>
        <Route exact path='/login' component={PageLogin}/>
        {/*<Route component={PageNotFound}/>*/}
      </Switch>
    </ConnectedRouter>
  )
}

const mapStateToProps = ({isAuthenticated, router}) => ({isAuthenticated, router})

export default connect(mapStateToProps)(Router)
