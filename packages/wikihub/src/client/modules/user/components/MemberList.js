import React from 'react'

import MemberListItem from './MemberListItem'

function MemberList({
  items = [],
}) {
  return  (
    <div>
      {
        items.length > 0
          ? items.map(member => <MemberListItem key={member.id} {...member}/>)
          : 'Не найдено ни одного человека'
      }
    </div>
  )
}

export default MemberList
