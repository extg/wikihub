import React from 'react'
import {Route} from 'react-router'
import {Switch} from 'react-router-dom'

import PageComingSoon from 'pages/PageComingSoon/PageComingSoon'
import PageEvents from 'pages/PageEvents'
import PageGroups from 'pages/PageGroups'
// import PageIndex from 'pages/PageIndex'
import PageMember from 'pages/PageMember'
import PageMembers from 'pages/PageMembers'
import PageNotFound from 'pages/PageNotFound'
import PageOffer from 'pages/PageOffer'

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={PageComingSoon}/>
      <Route exact path="/events" component={PageEvents}/>
      <Route exact path="/members" component={PageMembers}/>
      <Route exact path="/members/:id" component={PageMember}/>
      <Route exact path="/groups" component={PageGroups}/>
      <Route exact path="/offers/:id" component={PageOffer}/>
      <Route component={PageNotFound}/>
    </Switch>
  )
}

export default Router
