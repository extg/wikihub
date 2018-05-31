import {BATCH_ACTIONS} from '../actions'

export default function enableBatching(reducer) {
  return function batchingReducer(state, action) {
    switch (action.type) {
      case BATCH_ACTIONS:
        return action.payload.actions.reduce(reducer, state)
      default:
        return reducer(state, action)
    }
  }
}
