import React from 'react'

import Header from './header.js'

function Layout(props) {
  return (
    <div>
      <Header siteTitle='A24 Press Site' />
      <div className='container--l mxa p15 outer'>
        <main>{props.children}</main>
      </div>
    </div>
  )
}

export default Layout
