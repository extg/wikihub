import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {withDidMount} from 'dafisha-components'
import {Page, LayoutNav as Layout, Link, Header, Spinner} from 'dafisha-components'

import LoginLogout from 'components/LoginLogout'
import CreateOffer from 'offer/components/CreateOffer'
import {create, fetchOffers} from 'offer/actions'
import {fetchExperts} from 'member/actions'

const listLink = <Link to='/offers'>Вернуться к списку</Link>

function PageNewOffer({members, create, isCreating}) {
  return (
    <Page title='Новое предложение'>
      <Layout menuItems={[]} auth={<LoginLogout/>}>
        <Header title='Создание подборки' subtitle={listLink}/>
        {members
          ? <CreateOffer members={members} onSubmit={create} isCreating={isCreating}/>
          : <Spinner/>
        }
      </Layout>
    </Page>
  )
}

const mapStateToProps = state => ({
  members: state.member.items,
  isCreating: state.offer.isCreating,
})
const mapDispatchToProps = {create}

export default compose(
  withDidMount(fetchExperts),
  connect(mapStateToProps, mapDispatchToProps),
)(PageNewOffer)
