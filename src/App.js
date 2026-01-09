import React from 'react'
import {
  Router
} from '@reach/router'

import './index.css'

import { Auth0Provider } from '@auth0/auth0-react'

import PrivateRoute from './components/privateRoute.js'
import Layout from './components/layout.js'
import Films from './components/films.js'
import Film from './components/film.js'
import Products from './components/products.js'
import Product from './components/product.js'
import Books from './components/books.js'
import Book from './components/book.js'

import Login from './auth/login.js'
import Forgot from './auth/forgot.js'
import Signup from './auth/signup.js'
import Terms from './pages/terms.js'

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
  return (
    <div className="App">
    <link rel="stylesheet" href="https://use.typekit.net/ewm3ygz.css" />
    <link rel="stylesheet" href="https://cdn.plyr.io/3.5.3/plyr.css" />
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Layout>
          <Router>
            <PrivateRoute path='/' as={Films} />
            <PrivateRoute path='/films/:slug' as={Film} />
            <PrivateRoute path='/products' as={Products} />
            <PrivateRoute path='/products/:slug' as={Product} />
            <PrivateRoute path='/books' as={Books} />
            <PrivateRoute path='/books/:slug' as={Book} />
            <Login path='/login' />
            <Forgot path='/forgot' />
            <Terms path='/terms' />
            <AuthRoute as={Signup} path='/signup' />
          </Router>
        </Layout>
      </Auth0Provider>
    </div>
  )
}

export default App;
