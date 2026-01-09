import { useEffect } from 'react'
import { navigate } from '@reach/router'
import { useAuth0 } from '@auth0/auth0-react'
import { getLocalSession } from './auth.js'

export const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth0()
  
  useEffect(() => {
    const localSession = getLocalSession()
    if (isAuthenticated || localSession) {
      navigate('/')
    }
  }, [isAuthenticated])
}
