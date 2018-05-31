import Request from 'superagent'
import {filter} from 'ramda'

const compactObj = filter(value => typeof value !== 'undefined')

export const REQUEST_MEMBERS = 'REQUEST_MEMBERS'

export function requestExperts() {
  return {
    type: REQUEST_MEMBERS,
  }
}

export const RECEIVE_MEMBERS = 'RECEIVE_MEMBERS'

export function receiveExperts(items) {
  return {
    type: RECEIVE_MEMBERS,
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

export function fetchExperts() {
  return function (dispatch) {
    dispatch(requestExperts())

    Request
      .get(`${process.env.PUBLIC_API_URL}/members`)
      .then(response => response.body)
      .then(experts => dispatch(receiveExperts(experts)))
  }
}

export const CHANGE_PAGE = 'CHANGE_PAGE'

export function changePage({
  currentPage,
  totalPages,
  perPage,
}) {
  return {
    type: CHANGE_PAGE,
    payload: compactObj({
      currentPage,
      totalPages,
      perPage,
    }),
  }
}

export const REQUEST_MEMBER = 'REQUEST_MEMBER'

export function requestExpert(id) {
  return {
    type: REQUEST_MEMBER,
    payload: {
      id,
    },
  }
}

export const RECEIVE_MEMBER = 'RECEIVE_MEMBER'

export function receiveExpert(data) {
  return {
    type: RECEIVE_MEMBER,
    payload: {
      ...data,
    },
  }
}

export function fetchExpert(id) {
  return function (dispatch) {
    dispatch(requestExpert(id))

    Request
      .get(`${process.env.PUBLIC_API_URL}/members/${id}`)
      .then(response => response.body)
      .then(expert => dispatch(receiveExpert(expert)))
  }
}
