import {createSelector} from 'reselect'

import getVisibleMembers from './getVisibleMembers'

const getStatePagination = state => state.event.pagination

const getPagination = createSelector(
  [getVisibleMembers, getStatePagination],
  (items = [], pagination) => ({
    currentPage: pagination.currentPage,
    lastPage: Math.ceil(items.length / pagination.perPage),
  })
)

export default getPagination
