import React from 'react'
import {pipe} from 'ramda'
import {withStateHandlers} from 'recompose'
import {Button, Input, FormGroup} from 'dafisha-components'

const SubscriptionForm = ({onSubmit, name, email, setName, setEmail, reset}) => (
  <div>
    <h2 style={{
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 700,
      marginBottom: 10,
    }}>Получить доступ</h2>
    <FormGroup>
      Информационный портал "Деловая Афиша" является закрытым ресурсом,
      вход осуществляется по персональным инвайтам. Оставьте свою почту и мы свяжемся с вами.
    </FormGroup>
    <FormGroup>
      <Input value={name} onChange={setName} placeholder='Имя'/>
    </FormGroup>
    <FormGroup>
      <Input value={email} onChange={setEmail} placeholder='Почта'/>
    </FormGroup>
    <FormGroup>
      <Button onClick={pipe(() => onSubmit && onSubmit({name, email}), reset)} primary>Отправить</Button>
    </FormGroup>
  </div>
)

export default withStateHandlers(
  {
    name: '',
    email: '',
  },
  {
    setName: () => e => ({name: e.target.value}),
    setEmail: () => e => ({email: e.target.value}),
    reset: () => () => ({name: '', email: ''}),
  }
)(SubscriptionForm)
