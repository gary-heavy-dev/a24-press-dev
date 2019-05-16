import React from 'react'
import {
  Router
} from '@reach/router'

import './styles/main.css'

import { useNetlifyIdentity } from 'react-netlify-identity'
import { IdentityContext } from './api/context.js'

import Layout from './components/layout.js'
import Films from './components/films.js'

function App() {
  const identity = useNetlifyIdentity('https://kind-payne-6a3c49.netlify.com')
  return (
    <div className="App">
      <IdentityContext.Provider value={identity}>
        <Layout>
          <Router>
            <Films path='/' />
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
