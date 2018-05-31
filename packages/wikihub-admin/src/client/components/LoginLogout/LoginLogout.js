import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Button} from 'dafisha-components'

import {setAuthenticated} from 'actions'

function LoginLogout({isAuthenticated, setAuthenticated}) {
  return isAuthenticated
    ? (
      <Button size='sm' onClick={() => {
        localStorage.setItem('lol', '0')
        setAuthenticated(false)
      }}>Выйти</Button>
    ) : (
      <Redirect to='/login'/>
    )
}

const mapStateToProps = ({isAuthenticated}) => ({isAuthenticated})
const mapDispatchToProps = {setAuthenticated}

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogout)
