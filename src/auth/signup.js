import React from 'react'
import { navigate, Link } from '@reach/router'
import { IdentityContext } from '../api/context.js'
import useLoading from '../components/useLoading.js'
import astrochimp from 'astrochimp'

function Signup() {
  const { loginUser, signupUser } = React.useContext(IdentityContext)
  const formRef = React.useRef()
  const [msg, setMsg] = React.useState("")
  const [isLoading, load] = useLoading()
  return (
    <div>
      <form
        ref={formRef}
        onSubmit={e => {
          e.preventDefault()
          const email = e.target.email.value
          const publication = e.target.publication.value
          const phone = e.target.phone.value
          const password = e.target.password.value
          const mailChimpUrl = `https://a24films.us14.list-manage.com/subscribe/post?u=d6a612d44078d0634d5fa0663&amp;id=2b211ff970`
          load(signupUser(email, password))
            .then(user => {
              console.log("Success! Signed Up", user)
              astrochimp(mailChimpUrl, { EMAIL: email, PUBLICA: publication, PHONE: phone }, (err, data) => {
                if (err) {
                  console.log(err)
                } else {
                  console.log('hey data', data)
                }
              })
              navigate("/")
            })
            .catch(err => console.error(err) || setMsg("Error: " + err.message))
        }}
      >
        <div>
          <h3>Sign Up</h3>
          <label>
            <input className='auth__input x p1 mb1' required type="email" name="email" placeholder='Email' />
          </label>
        </div>
        <div className='mb1'>
          <label>
            <input className='auth__input x p1 mb1' required type="password" name="password" placeholder='Password' />
          </label>
        </div>
        <div className='my05'>
          <span class='akz-e caps small mb1 inline-block'>Optional</span>
        </div>
        <div className=''>
          <label>
            <input className='auth__input x p1 mb1' type="text" name="publication" placeholder='Publication' />
          </label>
        </div>
        <div className='mb1 pb1'>
          <label>
            <input className='auth__input x p1 mb1' type="tel" id="phone" name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder='Phone Number' />
          </label>
        </div>
        <div>
          <button className='button m05 akz caps mr1'>Sign Up </button>
          or <Link to='/login' className='underline'>Login</Link>
          {msg && <pre>{msg}</pre>}
        </div>
      </form>
    </div>
  )
}

export default Signup