import {
  map,
  merge,
  mergeDeepRight,
  uniq,
  reduce,
} from 'ramda'
import {
  byId,
  allIds,
} from 'dafisha-utils'

import initialState from './initialState'
import {
  REQUEST_OFFERS,
  RECEIVE_OFFERS,
  REQUEST_OFFER,
  RECEIVE_OFFER,
} from './actions'

export default function group(state = initialState, action) {
  switch (action.type) {
    case REQUEST_OFFERS:
      return merge(state, {
        isFetching: true,
      })
    case RECEIVE_OFFERS:
      return merge(state, {
        isFetching: false,
        items: action.items,
        byId: merge(state.byId, byId(action.items)),
        allIds: allIds(action.items),
      })
    case REQUEST_OFFER:
      return merge(state, {
        isFetching: true,
      })
    case RECEIVE_OFFER:
      return merge(state, {
        isFetching: false,
        current: action.payload,
        currentId: action.payload.id,
        byId: {
          [action.payload.id]: action.payload,
        },
      })
    default:
      return state
  }
}

const getMembers = map(/*подборка*/item => item.member)

export const getOffers = (state, props) => map(offer => ({
  ...offer,
  items: getMembers(offer.items),
}), props.data)
