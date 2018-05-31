import React from 'react'

import makePaginate from  './makePaginate';
import PagerItem from './PagerItem'
import css from './Pager.scss'

const paginate = makePaginate(/* delta */2);

function Pager({
  currentPage,
  lastPage,
  onChange,
}) {
  const pages = paginate(currentPage, lastPage);

  return (
    <ul className={css.Pager}>
      {pages.map(page => (
        <PagerItem
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={onChange}
        />
      ))}
    </ul>
  )
}

export default Pager
