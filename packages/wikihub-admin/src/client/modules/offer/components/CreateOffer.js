import React from 'react'

import OfferForm from './OfferForm'

function CreateOffer({
  members = [],
  onSubmit,
  isCreating,
} = {}) {
  return (
    <OfferForm
      members={members}
      onSubmit={onSubmit}
      processing={isCreating}
    />
  )
}

export default CreateOffer;
