import {
  merge,
  mergeDeepRight,
  uniq,
  reduce,
} from 'ramda'

import initialState from './initialState'
import {
  REQUEST_MEMBERS,
  RECEIVE_MEMBERS,
  REQUEST_MEMBER,
  RECEIVE_MEMBER,
  SET_FILTERS,
  CHANGE_PAGE,
} from './actions'

function byId(items = []) {
  return (items || []).reduce((result, item) => {
    result[item.id] = item
    return result
  }, {})
}

function allIds(items = []) {
  return (items || []).map(item => item.id)
}


const getAllTags = (items = []) =>
  uniq(reduce((result, item) =>
    result.concat(item.tags.replace(/#/g, ' ').split(/(\s|,)+/).filter(tag => tag.trim())),
  [], (items || [])))

export default function group(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MEMBERS:
      return merge(state, {
        isFetching: true,
      })
    case RECEIVE_MEMBERS:
      return merge(state, {
        isFetching: false,
        items: action.items,
        byId: {
          ...state.byId,
          ...byId(action.items),
        },
        tags: getAllTags(action.items),
        allIds: allIds(action.items),
      })
    case REQUEST_MEMBER:
      return merge(state, {
        isFetching: true,
      })
    case RECEIVE_MEMBER:
      return merge(state, {
        isFetching: false,
        currentId: action.payload.id,
        byId: {
          [action.payload.id]: action.payload,
        },
      })
    case SET_FILTERS:
      return mergeDeepRight(state, {
        filters: action.filters,
      })
    case CHANGE_PAGE:
      return mergeDeepRight(state, {
        pagination: action.payload,
      })
    default:
      return state
  }
}
