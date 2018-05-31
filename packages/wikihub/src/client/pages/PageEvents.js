import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  toPairs,
  pipe,
  map,
} from 'ramda'

import {
  fetchEvents,
  setFilters,
  changePage,
  fetchEventTypes,
} from 'event'
import {
  getVisibleGroupedEventsByDay,
  getFilters,
  getPagination,
} from 'event'
import {Page, LayoutNavSidebar as Layout} from 'dafisha-components'
import {TopSearch} from 'components/Search'
import Pager from 'components/Pager'
import EventList from 'event/components/EventListByDay'
import EventFilters from 'event/components/EventFilters'
import makeGetPage from 'makeGetPage'
import {batchActions} from 'actions'

class PageEvents extends Component {
  componentWillMount() {
    this.props.dispatch(fetchEvents())
    this.props.dispatch(fetchEventTypes())
  }

  render() {
    const {
      dispatch,
      match,
      items,
      filters,
      tags,
      companies,
      cities,
      types,
      pagination,
    } = this.props;

    const getPage = makeGetPage(pagination)

    const eventFiltersProps = {
      onChange: filter => dispatch(batchActions(
        setFilters(filter),
        changePage({currentPage: 1})
      )),
      filters,
      tags,
      companies,
      cities,
      types,
    }

    const eventFilters = <EventFilters {...eventFiltersProps}/>

    return (
      <Page title='События'>
        <Layout sidebar={eventFilters}>
          <TopSearch
            onChange={event => dispatch(batchActions(
              setFilters({search: {value: event.target.value}}),
              changePage({currentPage: 1})
            ))}
          >
            {eventFilters}
          </TopSearch>
          <EventList
            items={getPage(items)}
            onClickTag={tag => dispatch(batchActions(
              setFilters({tags: {value: [tag]}}),
              changePage({currentPage: 1})
            ))}
          />
          <Pager
            currentPage={pagination.currentPage}
            lastPage={pagination.lastPage}
            onChange={page => dispatch(changePage(page))}
          />
        </Layout>
      </Page>
    )
  }
}

const convertArrayToSelectItems = map(o => ({value: o, label: o}))
const convertObjectToSelectItems = pipe(toPairs, map(entry => ({value: entry[0], label: entry[1]})))

function mapStateToProps(state) {
  return {
    items: getVisibleGroupedEventsByDay(state),
    filters: getFilters(state),
    tags: convertArrayToSelectItems(state.tags),
    companies: convertArrayToSelectItems(state.companies),
    cities: convertArrayToSelectItems(state.cities),
    types: convertArrayToSelectItems(state.event.types),
    pagination: getPagination(state),
  }
}

export default connect(mapStateToProps)(PageEvents)
