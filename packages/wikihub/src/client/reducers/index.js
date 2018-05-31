import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import eventRootReducer from 'event'
import groupRootReducer from '../modules/group/reducers'
import memberRootReducer from '../modules/member/reducers'
import offerRootReducer from 'offer'

import enableBatching from './enableBatching'

const rootReducer = combineReducers({
  router: routerReducer,
  event: eventRootReducer,
  group: groupRootReducer,
  member: memberRootReducer,
  offer: offerRootReducer,
  tags: (state = []) => state,
  companies: (state = []) => state,
  cities: (state = []) => state,
})

export default enableBatching(rootReducer)
