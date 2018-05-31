import React from 'react'
import {connect} from 'react-redux'

import {Page, LayoutNavSidebar as Layout} from 'dafisha-components'
import {TopSearch} from 'components/Search'

import GroupList from 'group/components/GroupList'
import {
  fetchGroups,
  setFilters,
} from 'group/actions'
import {getVisibleGroups} from 'group/selectors'

class PageGroups extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchGroups())
  }

  render() {
    const {
      dispatch,
      items,
    } = this.props

    return (
      <Page
        title="Сообщества"
      >
        <Layout>
          <TopSearch
            onChange={event => dispatch(setFilters({
              search: {
                value: event.target.value,
              },
            }))}
          >
            {null}
          </TopSearch>
          <GroupList items={items}/>
        </Layout>
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: getVisibleGroups(state),
  }
}

export default connect(mapStateToProps)(PageGroups)
