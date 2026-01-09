import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getLocalSession } from '../api/auth.js'
import Login from '../auth/login.js'

function PrivateRoute(props) {
  const { isAuthenticated, isLoading } = useAuth0()
  const localSession = getLocalSession()
  const isUserAuthenticated = isAuthenticated || !!localSession

  let { as: Comp, ...rest } = props

  if (isLoading) return <div className="ac x container--xs mxa auth__none f jcc aic">Loading...</div>
  
  if (isUserAuthenticated) {
    return <Comp {...rest} />
  }

  return <Login />
}

export default PrivateRoute