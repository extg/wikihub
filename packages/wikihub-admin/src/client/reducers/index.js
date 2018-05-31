import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import enableBatching from './enableBatching'
import memberReducer from '../modules/member/reducers'
import offerReducer from '../modules/offer'

const rootReducer = combineReducers({
  isAuthenticated: (state = localStorage.lol === '1', action) => {
    if (action.type === 'SET_AUTH') {
      return action.payload
    }

    return state
  },
  router: routerReducer,
  member: memberReducer,
  offer: offerReducer,
  tags: (state = []) => state,
  companies: (state = []) => state,
  cities: (state = []) => state,
})

export default enableBatching(rootReducer)
