import React from 'react'

import GroupListItem from './GroupListItem'

const GroupList = ({
  items,
}) => (
  <div>
    {items && items.map(group => <GroupListItem key={group.id} {...group}/>)}
  </div>
)

export default GroupList
