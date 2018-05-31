import {createSelector} from 'reselect'
import {filter} from 'ramda'

import getMembers from './getMembers'
import getFilters from './getFilters'
import createCheckFiltersFn from 'createCheckFiltersFn'

const filterVisibleMembers = (experts, filters) => filter(createCheckFiltersFn(filters), experts)

const getVisibleMembers = createSelector([getMembers, getFilters], filterVisibleMembers)

export default getVisibleMembers
