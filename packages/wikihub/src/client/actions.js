export const BATCH_ACTIONS = 'BATCH_ACTIONS'

export function batchActions(...actions) {
  return {
    type: BATCH_ACTIONS,
    payload: {
      actions,
    }
  }
}
