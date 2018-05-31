import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {withDidMount} from 'dafisha-components'
import {Page, LayoutNav as Layout, Header, Link, Button, Spinner} from 'dafisha-components'

import LoginLogout from 'components/LoginLogout'
import OfferList from 'offer/components/OfferList'
import {fetchOffers} from 'offer/actions'
import {fetchExperts} from 'member/actions'

const newOfferLink = <Link to='offers/new'>Создать подборку</Link>


function PageOffers({offers}) {
  return (
    <Page title='Предложения'>
      <Layout menuItems={[]} auth={<LoginLogout/>}>
        <Header title='Предложения (подборки)' subtitle={newOfferLink}/>
        { offers.length
          ? <OfferList data={offers}/>
          : <Spinner/>}
      </Layout>
    </Page>
  )
}

const mapStateToProps = state => ({offers: state.offer.items})

// TODO: тут может быть ошибка, т.к. нет гарантий что эксперты загрузятся раньше.
export default compose(
  withDidMount(fetchExperts),
  withDidMount(fetchOffers),
  connect(mapStateToProps),
)(PageOffers)
