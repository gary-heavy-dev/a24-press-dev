import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { navigate } from '@reach/router'
import { getLocalSession } from '../api/auth.js'
import Login from '../auth/login.js'

function PrivateRoute(props) {
  const { isAuthenticated, isLoading } = useAuth0()
  const session = getLocalSession()
  const isExpired = session?.expired
  const isUserAuthenticated = isAuthenticated || (!!session && !isExpired)

  React.useEffect(() => {
    if (!isLoading && !isUserAuthenticated && isExpired) {
      navigate('/login', { state: { successMsg: 'Your session has expired. Please login again.' } })
    }
  }, [isLoading, isUserAuthenticated, isExpired])

  let { as: Comp, ...rest } = props

  if (isLoading) return <div className="ac x container--xs mxa auth__none f jcc aic">Loading...</div>
  
  if (isUserAuthenticated) {
    return <Comp {...rest} />
  }

  return <Login {...props} />
}

export default PrivateRoute