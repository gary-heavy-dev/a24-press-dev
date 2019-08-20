import React from 'react'
import { Link } from '@reach/router'

import Header from './header.js'

function Layout(props) {
  return (
    <div>
      <Header siteTitle='A24 Press Site' />
      <div className='container--l mxa p15 outer'>
        <main>{props.children}</main>
      </div>
      <div className='mt1 ac pt1 pb1'>
        <Link to='/terms' className='pb1'>Terms and Conditions</Link>
      </div>
    </div>
  )
}

export default Layout
