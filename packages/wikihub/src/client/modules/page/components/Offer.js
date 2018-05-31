import React from 'react'
import {map} from 'ramda'
import {Card} from 'dafisha-components'

import css from './Offer.scss'

const mapMembers = map(item => (
  <Card
    key={item.member.id}
    title={item.member.name}
    imageUrl={item.member.imageUrl}
    url={`${process.env.PUBLIC_MAIN_URL}/members/${item.member.id}`}
  >
    <p>
      {item.member.job}
    </p>
    <p className={css.comment}>
      {item.comment}
    </p>
  </Card>
))

function Offer({items = []}) {
  return (
    <div>
      {mapMembers(items)}
    </div>
  )
}

export default Offer
