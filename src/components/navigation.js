import React, { Component } from 'react'
import { Link } from '@reach/router'

class Navigation extends Component {
  render() {
    return (
      <div className="navigation mr1">
        <Link to='/' className="navigation__link">Films</Link>
        {/* <Link to='/products' className="navigation__link">Products</Link> */}
      </div>
    )
  }
}

export default Navigation