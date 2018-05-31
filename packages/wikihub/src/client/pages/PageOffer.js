import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {withDidMount} from 'dafisha-components'
import {Page, LayoutNav as Layout, Header, Link} from 'dafisha-components'

import {fetchOffer} from 'offer/actions'
import {fetchMembers} from 'member/actions'
import Offer from 'offer/components/Offer'

function PageOffer({offer}) {
  const title = offer.title || 'Предложение не найдено'

  return (
    <Page title={title}>
      <Layout>
        <Header title={title} subtitle={offer.description}/>
        <Offer items={offer.items}/>
      </Layout>
    </Page>
  )
}

const mapStateToProps = state => ({
  offer: state.offer.current,
})

// TODO: тут может быть ошибка, т.к. нет гарантий что эксперты загрузятся раньше.
export default compose(
  withDidMount(fetchMembers),
  withDidMount(fetchOffer, props => props.match.params.id),
  connect(mapStateToProps),
)(PageOffer)
