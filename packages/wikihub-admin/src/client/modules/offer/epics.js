import {combineEpics} from 'redux-observable'
import {Observable} from 'rxjs'
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/switchMap'
import request from 'superagent'
import {push} from 'react-router-redux'

import {
  create,
  createSuccess,
  createFailed,
  update,
  updateSuccess,
  updateFailed,
  REMOVE_OFFER,
  RECOVER_OFFER,
} from './actions'

const createOffer = action$ =>
  action$
    .ofType(create)
    .map(({payload}) => payload)
    .switchMap(data =>
      Observable
        .from(
          request
            .post(`${process.env.PUBLIC_API_URL}/offers/new`)
            .send(data)
            .set('accept', 'json')
        )
        .map(response => response.body)
        .map(data => createSuccess(data))
        .catch(error => Observable.of(createFailed(error)))
    )

const redirectAfterCreate = action$ =>
  action$
    .ofType(createSuccess)
    .map(({payload}) => payload)
    .switchMap(({id}) => Observable.of(push(`/offers/${id}/edit`)))

const updateOffer = action$ =>
  action$
    .ofType(update)
    .map(({payload}) => payload)
    .switchMap(({id, ...data}) =>
      Observable
        .from(
          request
            .patch(`${process.env.PUBLIC_API_URL}/offers/${id}`)
            .send(data)
            .set('accept', 'json')
        )
        .map(response => response.body)
        .map(data => updateSuccess(data))
        .catch(error => Observable.of(updateFailed(error)))
    )

// FIXME: может так получиться что запрос не дойдет нормально и будет ошибка
// так что тут по хорошему надо нормальный стрим экшенов возврзать, типа REMOVE_OFFER.SUCCESS
const removeOffer = action$ =>
  action$
    .ofType(REMOVE_OFFER)
    .map(({payload: {id}}) => id)
    .switchMap(id =>
      Observable
        .from(
          request.delete(`${process.env.PUBLIC_API_URL}/offers/${id}`)
        )
        .switchMap(() => empty())
    )

const recoverOffer = action$ =>
  action$
    .ofType(RECOVER_OFFER)
    .map(({payload: {id}}) => id)
    .switchMap(id =>
      Observable
        .from(
          request
            .patch(`${process.env.PUBLIC_API_URL}/offers/${id}`)
            .send({deleted: false})
            .set('accept', 'json')
        )
        .switchMap(() => empty())
    )

export default combineEpics(
  createOffer,
  redirectAfterCreate,
  updateOffer,
  removeOffer,
  recoverOffer,
)
