import React from 'react'
import {connect} from 'react-redux'
import {map} from 'ramda'
import cn from 'classnames/bind'
import {
  Box,
  Link,
  Section,
} from 'dafisha-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

import {getOffers} from 'offer'
import {removeOffer, recoverOffer} from 'offer/actions'

import css from './OfferList.scss'
import MemberThumbnails from './MemberThumbnails'

const cx = cn.bind(css)

function OfferHeader({id, title, deleted, removeOffer, recoverOffer}) {
  return (
    <div className={css.OfferHeader}>
      <Link to={`${process.env.PUBLIC_MAIN_URL}/offers/${id}`}>{title}</Link>
      <span className={css.actionIcons}>
        <Link className={css.actionLink} to={`/offers/${id}/edit`}>
          <FontAwesomeIcon icon={faEdit} size='sm'/>
        </Link>
        {!deleted ? (
          <Link className={css.actionLink} onClick={() => removeOffer(id)}>
            <FontAwesomeIcon icon={faTimes} size='sm'/>
          </Link>
        ) : (
          <Link className={cx('actionLink', 'actionRecover')} onClick={() => recoverOffer(id)}>
            <FontAwesomeIcon icon={faTimes} size='sm'/>
          </Link>
        )}
      </span>
    </div>
  )
}

const mapItems = ({removeOffer, recoverOffer}, data) => map(({
  id,
  title,
  description,
  items,
  deleted,
}) => (
  <Section
    key={id}
    header={<OfferHeader id={id} title={title} deleted={deleted} removeOffer={removeOffer} recoverOffer={recoverOffer}/>}
    footer={<MemberThumbnails items={items} />}
    disabled={deleted}
  >
    {description}
  </Section>
), data)

function OfferList({
  data,
  removeOffer,
  recoverOffer,
}) {
  return (
    <div>
      {data.length > 0 ? mapItems({removeOffer, recoverOffer}, data) : 'Предложений не найдено'}
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  data: getOffers(state, props),
})

const mapDispatchToProps = {removeOffer, recoverOffer}

export default connect(mapStateToProps, mapDispatchToProps)(OfferList)
