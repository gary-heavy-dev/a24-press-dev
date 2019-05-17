import React from 'react'
import { navigate, Link } from '@reach/router'
import { IdentityContext } from '../api/context.js'
import useLoading from '../components/useLoading.js'

function Login(props) {
  const { loginUser } = React.useContext(IdentityContext)
  const formRef = React.useRef()
  const [msg, setMsg] = React.useState('')
  const [isLoading, load] = useLoading()
  return (
    <div className='ac x container--xs mxa auth__none f jcc aic'>
      <div className='x'>
        <div>
          <form
            ref={formRef}
            onSubmit={e => {
              console.log('hey?')
              e.preventDefault()
              const email = e.target.email.value
              const password = e.target.password.value
              load(loginUser(email, password))
                .then(user => {
                  console.log('Success! Logged in', user)
                  navigate('/')
                })
                .catch(err => console.error(err) || setMsg('Error: ' + err.message))
            }}
          >
            <div>
              <h3>Welcome</h3>
              <label>
                <input className='auth__input x p1 mb1' type='email' name='email' placeholder='Email' />
              </label>
            </div>
            <div className='mb1 pb1'>
              <label>
                <input className='auth__input x p1 mb1' type='password' name='password' placeholder='Password' />
              </label>
            </div>
            <div>
              <input className='button m05 akz caps mr1' type='submit' value='Log in' />
              {msg && <pre>{msg}</pre>}
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