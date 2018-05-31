import React from 'react'

import OfferForm from './OfferForm'

function EditOffer({
  id,
  members,
  value,
  setValue,
  onSubmit,
  isUpdating,
} = {}) {
  return (
    <OfferForm
      members={members}
      value={value}
      setValue={setValue}
      onSubmit={data => onSubmit({id, ...data})}
      submitText='Сохранить'
      processing={isUpdating}
    />
  )
}

export default EditOffer;
