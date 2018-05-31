import React from 'react'
import {withState} from 'recompose'
import {map, propEq, assoc} from 'ramda'
import {Card, Link, Input, Button, FormGroup, Select, Spinner} from 'dafisha-components'
import {alter} from 'dafisha-utils'

import css from './OfferForm.scss'

const mapMembers = (items, onChange) => map(item => (
  <Card
    key={item.member.id}
    title={item.member.name}
    imageUrl={item.member.imageUrl}
    url={`${process.env.PUBLIC_MAIN_URL}/members/${item.member.id}`}
  >
    {item.member.job}
    <Input
      className={css.comment}
      placeholder='Комментарий'
      value={item.comment}
      onChange={e => {
        onChange(alter(
          propEq('memberId', item.member.id),
          assoc('comment', e.target.value),
          items
        ))
      }}
    />
  </Card>
), items)

const initialValue = {
  title: '',
  description: '',
  expires: '',
  items: [],
}

const mapMembersToOptions = map(member => ({
  member,
  comment: '',
  memberId: member.id,
  value: member.id,
  label: member.name,
}))

const mapItemsToOptions = map(item => ({
  ...item,
  label: item.member.name,
  value: item.memberId
}))

const makeOnChange = (key, fullValue, setValue) =>
  value => setValue({
    ...fullValue,
    [key]: value,
  })

const makeOnChangeEvent = (key, fullValue, setValue) =>
  e => setValue({
    ...fullValue,
    [key]: e.target.value,
  })

const sanitizeItems = map(({memberId, comment}) => ({memberId, comment}))

const sanitizeBeforeSubmit = ({
  title,
  description,
  items,
  // TODO:
  // expires,
}) => ({
  title,
  description,
  items: sanitizeItems(items),
})

function OfferForm({
  members = [],
  value,
  setValue,
  onSubmit,
  submitText = 'Создать',
  processing,
} = {}) {
  const isItemsEmpty = value.items.length === 0

  return (
    <div className={css.root}>
      <FormGroup>
        <Input
          placeholder='Заголовок'
          onChange={makeOnChangeEvent('title', value, setValue)}
          value={value.title}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder='Описание'
          onChange={makeOnChangeEvent('description', value, setValue)}
          value={value.description}
        />
      </FormGroup>
      <Select
        multi
        onChange={makeOnChange('items', value, setValue)}
        options={mapMembersToOptions(members)}
        placeholder='Выберите участников'
        value={mapItemsToOptions(value.items)}
      />
      {!isItemsEmpty && (
        <div className={css.help}>
          Комментарий при удалении участника <strong>не</strong> сохранится!
        </div>
      )}
      <div className={css.list}>
        {mapMembers(value.items, makeOnChange('items', value, setValue))}
      </div>
      <div className={css.footer}>
        <Button
          primary
          disabled={isItemsEmpty}
          onClick={() => onSubmit(sanitizeBeforeSubmit(value))}
        >{submitText}</Button>
        <span className={css.status}>
        {processing && <Spinner/>}
          {isItemsEmpty && <span className={css.textMuted}> Добавьте участников, чтобы создать подборку</span>}
      </span>
      </div>
    </div>
  )
}

export default withState(
  'value', 'setValue', props => props.value || initialValue
)(OfferForm);
