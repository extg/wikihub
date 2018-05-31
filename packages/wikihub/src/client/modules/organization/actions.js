import Request from 'superagent'

export const REQUEST_GROUPS = 'REQUEST_GROUPS'

export function requestGroups() {
  return {
    type: REQUEST_GROUPS,
  }
}

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS'

export function receiveGroups(items) {
  return {
    type: RECEIVE_GROUPS,
    items,
  }
}

export const SET_FILTERS = 'SET_FILTERS'

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    filters,
  }
}

export function fetchGroups() {
  return function (dispatch) {
    dispatch(requestGroups())

    Request
      .get(`${process.env.PUBLIC_API_URL}/groups`)
      .then(response => response.body)
      .then(groups => dispatch(receiveGroups(groups)))
  }
}
