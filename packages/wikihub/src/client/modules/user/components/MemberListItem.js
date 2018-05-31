import React from 'react'

import {Box, Card} from 'dafisha-components'

function MemberListItem({
  imageUrl,
  name,
  job,
  id,
}) {
  return (
    <Box>
      <Card
        title={name}
        imageUrl={imageUrl}
        url={`/members/${id}`}
      >{job}</Card>
    </Box>
  )
}

export default MemberListItem
