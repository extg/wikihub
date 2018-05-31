import React from 'react'

import css from './Backstretch.scss'

// implements by https://snook.ca/archives/html_and_css/simplest-css-slideshow

function Backstretch({
  // classes,
  // The amount of time in between slides, ms
  // duration,
  // This is the speed at which the image will fade in, ms
  // fade,
  // imageUrls = [],
  children,
}) {
  return (
    <div className={css.root}>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      <div className={css.bg}/>
      {children}
    </div>
  )
}

export default Backstretch
