import React from 'react'
import { Link } from '@reach/router'
import { login, getError } from '../api/auth.js'
import { useAuthRedirect } from '../api/authHooks.js'
import useLoading from '../components/useLoading.js'

function Login(props) {
  useAuthRedirect()
  const [message, setMessage] = React.useState('')
  const [, load] = useLoading()

  React.useEffect(() => {
    if (props.location?.state?.successMsg) {
      setMessage(props.location.state.successMsg)
      window.history.replaceState({}, document.title)
    }
  }, [props.location])

  const handleSubmit = e => {
    e.preventDefault()
    const { email, password } = e.target
    load(login(email.value, password.value))
      .catch(error => setMessage('Error: ' + getError(error)))
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
              {message && <pre className='auth__error'>{message}</pre>}
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