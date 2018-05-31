import React from 'react'

import {Box, Input} from 'dafisha-components'
import MobileAdvancedSearch from './MobileAdvancedSearch'

import css from './TopSearch.scss'

function TopSearch({
  placeholder = 'Поиск',
  onChange,
  children,
}) {
  return (
    <div className={css.root}>
      <Input
        size='m'
        placeholder={placeholder}
        onChange={onChange}
      />
      <MobileAdvancedSearch>
        {children}
      </MobileAdvancedSearch>
    </div>
  )
}

export default TopSearch
