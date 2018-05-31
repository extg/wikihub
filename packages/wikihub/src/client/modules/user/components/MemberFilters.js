import React from 'react'
import Select from 'react-select'
import {pathOr} from 'ramda'

import 'react-select/dist/react-select.css'

import css from 'event/styles.scss'

const getValue = pathOr(null, ['value'])

const EventFilters = ({
  filters,
  tags,
  companies,
  cities,
  fieldsOfMemberise,
  onChange,
}) => (
  <div className={css.sidebar}>
    <Select
      name="city"
      value={filters.city.value}
      options={cities}
      onChange={data => onChange({city: {value: getValue(data)}})}
      placeholder="Город"
    />
    {/*<br/>
    <Select
      name="company"
      value={filters.company.value}
      options={companies}
      onChange={data => onChange({company: {value: getValue(data)}})}
      placeholder="Компания"
    />*/}
    <br/>
    <Select
      multi
      name="tag"
      value={filters.tags.value}
      options={tags}
      onChange={data => onChange({tags: {value: data}})}
      placeholder="Теги"
    />
   {/* <br/>
    <Select
      name="fieldOfMemberise"
      value={filters.fieldOfMemberise.value}
      options={fieldsOfMemberise}
      onChange={data => onChange({fieldOfMemberise: {value: data}})}
      placeholder="Сфера деятельности"
    />*/}
  </div>
)

export default EventFilters
