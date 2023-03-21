import React from 'react'
import { navigate, Link } from '@reach/router'
import { IdentityContext } from '../api/context.js'
import useLoading from '../components/useLoading.js'

function Forgot() {
  const { requestPasswordRecovery } = React.useContext(IdentityContext)
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
              e.preventDefault()
              const email = e.target.email.value
              load(requestPasswordRecovery(email))
                .then(user => {
                  console.log('Recovery Started', user)
                  navigate('/')
                })
                .catch(err => console.error(err) || setMsg('Error: ' + err.message))
            }}
          >
            <div>
              <h3>Enter your email to reset</h3>
              <label>
                <input className='auth__input x p1 mb1' type='email' name='email' placeholder='Email' />
              </label>
            </div>
            <div>
              <input className='button m05 akz caps mr1' type='submit' value='Request reset' />
              {msg && <pre>{msg}</pre>}
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