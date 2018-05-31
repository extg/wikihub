import React from 'react'
import {connect} from 'react-redux'
import {map} from 'ramda'
import {Link} from 'dafisha-components'

import css from './MemberThumbnails.scss'

const mapItems = map(({
  id,
  name,
  imageUrl,
}) => (
  <Link key={id} to={`${process.env.PUBLIC_MAIN_URL}/members/${id}`} className={css.thumbnail}>
    <img className={css.img} src={imageUrl} alt={name} />
  </Link>
))

function MemberThumbnails({items = []}) {
  return items.length > 0 ? (
    <div className={css.root}>
      {mapItems(items)}
    </div>
  ) : null
}

export default MemberThumbnails
