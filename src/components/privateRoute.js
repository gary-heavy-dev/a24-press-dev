import React from "react"
import Login from '../auth/login.js'
import { IdentityContext } from '../api/context.js'
import netlifyIdentity from 'netlify-identity-widget'

class PrivateRoute extends React.Component {
  static contextType = IdentityContext
  constructor() {
    super()
    this.state = {
      loggedIn: false
    }
  }
  componentDidMount() {
    if (this.context.isLoggedIn) {
      this.setState({
        loggedIn: true
      })
    }

    netlifyIdentity.on('login', user => {
      setTimeout(() => {
        document.location.reload()
      }, 1000)
    })
  }
  componentDidUpdate() {
    if (this.context.user === undefined) {
      if (this.state.loggedIn) {
        this.setState({
          loggedIn: false
        })
      }
    } else if (this.context.isLoggedIn) {
      if (!this.state.loggedIn) {
        this.setState({
          loggedIn: true
        })
        setTimeout(() => {
          // location.reload()
        }, 400)
      }
    }
  }
  render() {
    let { as: Comp, ...rest } = this.props
    return (
      <div>
        {this.state.loggedIn ? (
          <Comp {...rest} />
        ) : (
            <Login />
          )}
      </div>
    )
  }
}


export default PrivateRoute