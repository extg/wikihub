import React from 'react'
import {connect} from 'react-redux'
import {map} from 'ramda'


import {Page, LayoutNavSidebar as Layout} from 'dafisha-components'
import {TopSearch} from 'components/Search'
import MemberList from 'member/components/MemberList'
import MemberFilters from 'member/components/MemberFilters'
import Pager from 'components/Pager'
import makeGetPage from 'makeGetPage'
import {batchActions} from 'actions'
import {
  fetchMembers,
  setFilters,
  changePage,
} from 'member/actions'
import {
  getVisibleMembers,
  getFilters,
  getPagination,
} from 'member/selectors'

class PageMembers extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMembers())
  }

  render() {
    const {
      dispatch,
      items,
      filters,
      tags,
      companies,
      cities,
      fieldsOfMemberise,
      pagination,
    } = this.props

    const expertFiltersProps = {
      onChange: filter => dispatch(
        batchActions(
          setFilters(filter),
          changePage({currentPage: 1})
        )
      ),
      filters,
      tags,
      companies,
      cities,
      fieldsOfMemberise,
    }

    const expertFilters = <MemberFilters {...expertFiltersProps}/>

    const getPage = makeGetPage(pagination)

    return (
      <Page
        title="Эксперты"
        sidebar={expertFilters}
      >
        <Layout>
          <TopSearch
            onChange={event => dispatch(batchActions(
              setFilters({
                search: {
                  type: 'search',
                  value: event.target.value,
                },
              }),
              changePage({currentPage: 1})
            ))}
          >
            {expertFilters}
          </TopSearch>
          <MemberList items={getPage(items)}/>
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

function mapStateToProps(state) {
  return {
    items: getVisibleMembers(state),
    filters: getFilters(state),
    tags: convertArrayToSelectItems(state.member.tags || []),
    companies: convertArrayToSelectItems(state.companies),
    cities: convertArrayToSelectItems(state.cities),
    fieldsOfMemberise: convertArrayToSelectItems(state.member.fieldsOfMemberise),
    pagination: getPagination(state),
  }
}

export default connect(mapStateToProps)(PageMembers)
