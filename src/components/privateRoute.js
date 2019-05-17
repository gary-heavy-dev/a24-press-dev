import React from "react"
import {
  isLoggedIn
} from '../api/auth.js'
import {
  navigate
} from "@reach/router"
import Login from '../auth/login.js'
import { IdentityContext } from '../api/context.js'


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
  }
  componentWillReceiveProps () {
    if (this.context.user === undefined) {
      this.setState({
        loggedIn: false
      })
    } else if (this.context.isLoggedIn) {
      this.setState({
        loggedIn: true
      })
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