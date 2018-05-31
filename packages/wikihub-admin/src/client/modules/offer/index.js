import {
  map,
  merge,
  mergeDeepRight,
  uniq,
  reduce,
  propEq,
  assoc,
} from 'ramda'
import {
  byId,
  allIds,
  alter,
} from 'dafisha-utils'

import initialState from './initialState'
import {
  CREATE,
  CREATE_SUCCESS,
  CREATE_FAILED,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  REQUEST_OFFERS,
  RECEIVE_OFFERS,
  REMOVE_OFFER,
  RECOVER_OFFER,
} from './actions'

export {default as epics} from './epics'

const removeOffer = (id, items) => alter(propEq('id', id), assoc('deleted', true), items)
const recoverOffer = (id, items) => alter(propEq('id', id), assoc('deleted', false), items)

export default function group(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return merge(state, {
        isCreating: true,
      })
    case CREATE_SUCCESS:
    case CREATE_FAILED:
      return merge(state, {
        isCreating: false,
      })
    case UPDATE:
      return merge(state, {
        isUpdating: true,
      })
    case UPDATE_SUCCESS:
    case UPDATE_FAILED:
      return merge(state, {
        isUpdating: false,
      })
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
    case REMOVE_OFFER:
      return merge(state, {
        items: removeOffer(action.payload.id, state.items),
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            deleted: true,
          }
        },
      })
    case RECOVER_OFFER:
      return merge(state, {
        items: recoverOffer(action.payload.id, state.items),
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            deleted: false,
          }
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
