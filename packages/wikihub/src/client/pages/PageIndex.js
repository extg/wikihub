import React from 'react'
import {connect} from 'react-redux'
import cn from 'classnames/bind'

import {Page, Section, Link, LayoutNav as Layout} from 'dafisha-components'
import {getGroupedEventsByDay as getEvents} from 'event'
import getMembers from 'member/selectors/getMembers'
import getGroups from 'group/selectors/getGroups'
import EventList from 'event/components/EventListByDay'
import MemberList from 'member/components/MemberList'
import GroupList from 'group/components/GroupList'

// TODO: batch action for thunk
// import {batchActions} from '../actions'
import {fetchEvents} from 'event'
import {fetchMembers} from 'member/actions'
import {fetchGroups} from 'group/actions'

import styles from './PageIndex.scss'

const cx = cn.bind(styles)

const EventHeader = <h2>Ближайшие события</h2>
const MembersHeader = <h2>Новые люди</h2>
const GroupsHeader = <h2>Топ сообществ</h2>

const EventFooter = <Link to='/events'>Посмотреть все события</Link>
const MemberFooter = <Link to='/members'>Посмотреть всех людей</Link>
const GroupFooter = <Link to='/groups'>Посмотреть все сообщества</Link>

class PageIndex extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchEvents())
    this.props.dispatch(fetchMembers())
    this.props.dispatch(fetchGroups())
  }

  render() {
    const {
      events,
      members,
      groups,
    } = this.props

    return (
      <Page>
        <Layout>
          <div className={cx('PageIndex')}>
            <Section header={EventHeader} footer={EventFooter}>
              <EventList items={events}/>
            </Section>
            <Section header={MembersHeader} footer={MemberFooter}>
              <MemberList items={members}/>
            </Section>
            <Section header={GroupsHeader} footer={GroupFooter}>
              <GroupList items={groups}/>
            </Section>
          </div>
        </Layout>
      </Page>
    )
  }
}

function sliceFirst(n, arr = []) {
  return Array.from(arr).splice(0, n)
}

function sliceLast(n, arr = []) {
  return Array.from(arr).splice(-n, n)
}

function mapStateToProps(state) {
  return {
    events: sliceFirst(5, getEvents(state)),
    members: sliceLast(5, getMembers(state)),
    groups: sliceFirst(5, getGroups(state)),
  }
}

export default connect(mapStateToProps)(PageIndex)
