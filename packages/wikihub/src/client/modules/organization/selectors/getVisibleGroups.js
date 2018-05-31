import {createSelector} from 'reselect'
import {filter} from 'ramda'

import getGroups from './getGroups'
import getFilters from './getFilters'
import createCheckFiltersFn from 'createCheckFiltersFn'

const filterVisibleGroups = (events, filters) => filter(createCheckFiltersFn(filters), events)
const getVisibleGroups = createSelector([getGroups, getFilters], filterVisibleGroups)

export default getVisibleGroups
