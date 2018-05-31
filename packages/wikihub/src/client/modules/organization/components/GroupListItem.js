import React from 'react'

import {Box, Card} from 'dafisha-components'

function GroupListItem({
  imageUrl,
  title,
  lineup,
  sum,
  id,
}) {
  return (
    <Box>
      <Card
        title={title}
        imageUrl={imageUrl}
        subText={sum}
        url={`/groups/${id}`}
      >{lineup}</Card>
    </Box>
  )
}

export default GroupListItem
