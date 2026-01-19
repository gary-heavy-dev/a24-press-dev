import React from 'react'
import { navigate, Link } from '@reach/router'
import { recovery, getError } from '../api/auth.js'
import useLoading from '../components/useLoading.js'

function Forgot() {
  const [message, setMessage] = React.useState('')
  const [, load] = useLoading()
  
  const handleSubmit = e => {
    e.preventDefault()
    const email = e.target.email.value
    load(recovery(email))
      .then((response) => navigate('/login', { state: { successMsg: response } }))
      .catch(error => setMessage('Error: ' + getError(error)))
  }

  return (
    <div className='ac x container--xs mxa auth__none f jcc aic'>
      <div className='x'>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Enter your email to reset</h3>
              <label>
                <input className='auth__input x p1 mb1' type='email' name='email' placeholder='Email' />
              </label>
            </div>
            <div>
              <input className='button m05 akz caps mr1' type='submit' value='Request reset' />
              {message && <pre className='auth__error'>{message}</pre>}
            </div>
            <div className='mt pt1'>
              <div>or <Link to='/' className='underline'>Cancel</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgot