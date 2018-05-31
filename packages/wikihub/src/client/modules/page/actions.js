import request from 'superagent'
import {filter} from 'ramda'

const compactObj = filter(value => typeof value !== 'undefined')

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
      .get(`${process.env.PUBLIC_API_URL}/offers/${id}`)
      .then(response => response.body)
      .then(expert => dispatch(receiveOffer(expert)))
  }
}
