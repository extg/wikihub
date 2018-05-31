import React from 'react'

import css from './styles.scss'

const Tag = ({
  color = 'gray',
  size = 's',
  children,
  onClick = () => {},
}) => <span className={css.tag} onClick={onClick}>{children}</span>

export default Tag
