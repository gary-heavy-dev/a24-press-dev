import React from 'react'
import {
  Router
} from '@reach/router'

import './index.css'

import { useNetlifyIdentity } from 'react-netlify-identity'
import { IdentityContext } from './api/context.js'
import { initAuth } from './api/auth.js'

import PrivateRoute from './components/privateRoute.js'
import Layout from './components/layout.js'
import Films from './components/films.js'
import Film from './components/film.js'

import Login from './auth/login.js'
import Signup from './auth/signup.js'

initAuth()

function AuthRoute(props) {
  let { as: Comp, ...rest } = props
  return (
    <div className='ac x container--xs mxa auth__none f jcc aic'>
      <div className='x'>
        <Comp {...rest} />
      </div>
    </div>
  )
}

function App() {
  const identity = useNetlifyIdentity('https://a24press.netlify.com')
  return (
    <div className="App">
    <link rel="stylesheet" href="https://use.typekit.net/ewm3ygz.css" />
      <IdentityContext.Provider value={identity}>
        <Layout>
          <Router>
            <PrivateRoute path='/' as={Films} />
            <Film path='/films/:slug' />
            <Login path='/login' />
            <AuthRoute as={Signup} path='/signup' />
          </Router>
        </Layout>
      </IdentityContext.Provider>
    </div>
  )
}

function PublicRoute(props) {
  return <div className='container--l mxa p1 outer'> {
    props.children
  } </div>
}

export default App;
