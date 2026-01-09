import React from 'react'
import { Link } from '@reach/router'
import { login, getError, EXPIRED_KEY } from '../api/auth.js'
import { useAuthRedirect } from '../api/authHooks.js'
import useLoading from '../components/useLoading.js'

function Login() {
  useAuthRedirect()
  const [msg, setMsg] = React.useState('')
  // eslint-disable-next-line no-unused-vars
  const [isLoading, load] = useLoading()

  React.useEffect(() => {
    if (localStorage.getItem(EXPIRED_KEY)) {
      setMsg('Your session has expired. Please login again.')
      localStorage.removeItem(EXPIRED_KEY)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const { email, password } = e.target
    load(login(email.value, password.value))
      .catch(err => setMsg('Error: ' + getError(err)))
  }

  return (
    <div className='ac x container--xs mxa auth__none f jcc aic'>
      <div className='x'>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Welcome</h3>
              <label>
                <input className='auth__input x p1 mb1' type='email' name='email' placeholder='Email' autoComplete="email" />
              </label>
            </div>
            <div className='mb1 pb1'>
              <label>
                <input className='auth__input x p1 mb1' type='password' name='password' placeholder='Password' autoComplete="current-password" />
              </label>
            </div>
            <div>
              <input className='button m05 akz caps mr1' type='submit' value='Log in' />
              {msg && <pre className='auth__error'>{msg}</pre>}
            </div>
            <div className='mt pt1'>
              Don't have an account? <Link to='/signup' className='underline'>Sign Up</Link>
              <div>or <Link to='/forgot' className='underline'>Forgot your password?</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login