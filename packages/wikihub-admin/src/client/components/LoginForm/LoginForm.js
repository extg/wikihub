import React from 'react'
import {withStateHandlers} from 'recompose'
import {Box, Header, FormGroup, Input, Button} from 'dafisha-components'

import css from './LoginForm.scss'

function LoginForm({errorMessage, changeLogin, changePassword, submit}) {
  return (
    <Box className={css.root}>
      <form onSubmit={e => {
        e.preventDefault()

        submit()
      }}>
        <Header
          title={process.env.APP_TITLE}
          subtitle={<span className={css.errorMessage}>{errorMessage}</span>}
        />
        <FormGroup>
          <Input placeholder='Логин' onChange={changeLogin}/>
        </FormGroup>
        <FormGroup>
          <Input placeholder='Пароль' type='password' onChange={changePassword}/>
        </FormGroup>
        <Button primary onClick={submit}>Войти</Button>
      </form>
    </Box>
  )
}

const initialState = {
  login: '',
  password: '',
}

const stateUpdaters = {
  changeLogin: () => e => ({login: e.target.value}),
  changePassword: () => e => ({password: e.target.value}),
  submit: (state, {onSubmit}) => () => { onSubmit(state) }
}

export default withStateHandlers(
  initialState,
  stateUpdaters,
)(LoginForm)
