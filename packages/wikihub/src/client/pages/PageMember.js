import React from 'react'
import {connect} from 'react-redux'

import {Page, LayoutNav as Layout} from 'dafisha-components'
import MemberProfile from 'member/components/MemberProfile'
import {fetchMember} from 'member/actions'
import {getMember} from 'member/selectors'

class PageMember extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMember(this.props.match.params.id))
  }

  render() {
    const {
      data = {},
      isFetching,
      match: {
        params: {
          id,
        },
      },
    } = this.props

    return (
      <Page
        title={data.name}
      >
        <Layout>
          {!isFetching && <MemberProfile {...data}/>}
        </Layout>
      </Page>
    )
  }
}

function mapStateToProps(state, props) {
  const {id} = props.match.params

  return {
    data: getMember(state, {id}),
    isFetching: state.isFetching,
  }
}

export default connect(mapStateToProps)(PageMember)
