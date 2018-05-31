import React from 'react'
import {Button, Page, Logo} from 'dafisha-components'
import {withStateHandlers} from 'recompose'

import Backstretch from 'components/Backstretch'

import AccessModal from './AccessModal'
import css from './PageComingSoon.scss'

function PageComingSoon({
  isModalOpen,
  openModal,
  closeModal,
}) {
  return (
    <Page>
      <Backstretch>
        <div className={css.content}>
          <div className={css.logo}>
            <Logo size='l'/>
            <span className={css.logoText}>Деловая Афиша</span>
          </div>
          <div className={css.heading}>
            Частный информационный портал
          </div>
          <div className={css.desc}>
            Мы предоставляем актуальную информацию о деловых событиях, людях и возможностях Санкт-Петербурга и Москвы.
          </div>
          <div className={css.action}>
            <Button primary onClick={openModal}>Получить доступ</Button>
          </div>
          <div className={css.footer}>
            2018 © Деловая Афиша
          </div>
        </div>
      </Backstretch>
      <AccessModal isOpen={isModalOpen} onRequestClose={closeModal}/>
    </Page>
  )
}

export default withStateHandlers(
  {
    isModalOpen: false,
  },
  {
    openModal: () => () => ({isModalOpen: true}),
    closeModal: () => () => ({isModalOpen: false}),
  }
)(PageComingSoon)
