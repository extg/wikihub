import request from 'superagent'
import {createAction} from 'redux-actions'
import {filter} from 'ramda'

const compactObj = filter(value => typeof value !== 'undefined')

export const CREATE = 'offer/CREATE'
export const CREATE_SUCCESS = 'offer/CREATE_SUCCESS'
export const CREATE_FAILED = 'offer/CREATE_FAILED'

export const create = createAction(CREATE)
export const createSuccess = createAction(CREATE_SUCCESS)
export const createFailed = createAction(CREATE_FAILED)

export const UPDATE = 'offer/UPDATE'
export const UPDATE_SUCCESS = 'offer/UPDATE_SUCCESS'
export const UPDATE_FAILED = 'offer/UPDATE_FAILED'

export const update = createAction(UPDATE)
export const updateSuccess = createAction(UPDATE_SUCCESS)
export const updateFailed = createAction(UPDATE_FAILED)

export const REMOVE_OFFER = 'REMOVE_OFFER'

export const removeOffer = createAction(REMOVE_OFFER, id => ({id}))

export const RECOVER_OFFER = 'RECOVER_OFFER'

export const recoverOffer = createAction(RECOVER_OFFER, id => ({id}))

export const REQUEST_OFFERS = 'REQUEST_OFFERS'

export function requestOffers() {
  return {
    type: REQUEST_OFFERS,
  }
}

export const RECEIVE_OFFERS = 'RECEIVE_OFFERS'

export function receiveOffers(items) {
  return {
    type: RECEIVE_OFFERS,
    items,
  }
}

export function fetchOffers() {
  return function (dispatch) {
    dispatch(requestOffers())

    request
      .get(`${process.env.PUBLIC_API_URL}/offers`)
      .then(response => response.body)
      .then(items => dispatch(receiveOffers(items)))
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

export const REQUEST_OFFER = 'REQUEST_OFFER'

export function requestOffer(id) {
  return {
    type: REQUEST_OFFER,
    payload: {
      id,
    },
  }
}

export const RECEIVE_OFFER = 'RECEIVE_OFFER'

export function receiveOffer(data) {
  return {
    type: RECEIVE_OFFER,
    payload: {
      ...data,
    },
  }
}

export function fetchOffer(id) {
  return function (dispatch) {
    dispatch(requestOffer(id))

    request
      .get(`${process.env.PUBLIC_API_URL}/members/${id}`)
      .then(response => response.body)
      .then(expert => dispatch(receiveOffer(expert)))
  }
}
