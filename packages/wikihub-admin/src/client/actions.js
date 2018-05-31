export const BATCH_ACTIONS = 'BATCH_ACTIONS'

export function batchActions(...actions) {
  return {
    type: BATCH_ACTIONS,
    payload: {
      actions,
    }
  }
}

export const SET_AUTH = 'SET_AUTH'

export function setAuthenticated(payload) {
  return {
    type: SET_AUTH,
    payload,
  }
}
