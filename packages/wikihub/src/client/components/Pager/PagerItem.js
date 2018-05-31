import React from 'react'
import classNames from 'classnames'

import {Link} from 'dafisha-components'
import css from './Pager.scss'

function PagerItem({
  page,
  isActive,
  onClick,
}) {
  return (
    <li className={classNames(css.PagerItem, {[css.isActive]: isActive})}>
      {
        isActive ? (
          <span>{page}</span>
        ) : (
          <Link
            onClick={event => {
              event.preventDefault()
              onClick({currentPage: page})
            }}
            to={{
              search: `?page=${page}`,
            }}
          >{page}</Link>
        )
      }
    </li>
  )
}

export default PagerItem
