import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {withDidMount} from 'dafisha-components'
import {Page, LayoutNav as Layout, Link, Header, Spinner} from 'dafisha-components'

import LoginLogout from 'components/LoginLogout'
import EditOffer from 'offer/components/EditOffer'
import {fetchOffers, update} from 'offer/actions'
import {fetchExperts} from 'member/actions'

const listLink = <Link to='/offers'>Вернуться к списку</Link>

function PageEditOffer({offer, members, update, isUpdating}) {
  return (
    <Page title={offer ? offer.title : 'Редактирование подборки'}>
      <Layout menuItems={[]} auth={<LoginLogout/>}>
        <Header title='Редактирование подборки' subtitle={listLink}/>
        {offer && members.length
          ? <EditOffer id={offer.id} members={members} value={offer} onSubmit={update} isUpdating={isUpdating}/>
          : <Spinner/>}
      </Layout>
    </Page>
  )
}

const mapStateToProps = (state, props) => ({
  offer: state.offer.byId[props.match.params.id],
  members: state.member.items,
  isUpdating: state.offer.isUpdating,
})
const mapDispatchToProps = {update}


export default compose(
  withDidMount(fetchExperts),
  withDidMount(fetchOffers),
  connect(mapStateToProps, mapDispatchToProps),
)(PageEditOffer)
