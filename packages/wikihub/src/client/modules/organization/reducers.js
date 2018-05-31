import {
  merge,
  mergeDeepRight,
} from 'ramda'

import initialState from './initialState'
import {
  REQUEST_GROUPS,
  RECEIVE_GROUPS,
  SET_FILTERS,
} from './actions'

export default function group(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GROUPS:
      return merge(state, {
        isFetching: true,
      })
    case RECEIVE_GROUPS:
      return merge(state, {
        isFetching: false,
        items: action.items,
      })
    case SET_FILTERS:
      return mergeDeepRight(state, {
        filters: action.filters,
      })
    default:
      return state
  }
}
