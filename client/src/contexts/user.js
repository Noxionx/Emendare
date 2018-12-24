import React from 'react'
import { apiFetch } from '../utils'

export const UserContext = React.createContext()

export class UserProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      isConnectionPending: true,
      isConnected: () => this.state.user !== null,
      login: user => {
        localStorage.setItem('user-token', user.token)
        this.setState(() => ({ user }))
      },
      logout: event => {
        event.preventDefault()
        localStorage.removeItem('user-token')
        this.setState(() => ({ user: null }))
      },
      fetchUser: () => {
        return apiFetch('/user', { method: 'post' }).then(async res => {
          if (res.status === 200) {
            const user = await res.json()
            this.setState({ user })
          }
        })
      }
    }
  }

  componentDidMount() {
    const userToken = localStorage.getItem('user-token')
    if (userToken) {
      this.setState({ isConnectionPending: true })
      apiFetch('/login', { method: 'post' }).then(async res => {
        if (res.status === 200) {
          const user = await res.json()
          this.setState({ user, isConnectionPending: false })
        } else {
          localStorage.removeItem('user-token')
          this.setState({ isConnectionPending: false })
        }
      })
    } else {
      this.setState({ isConnectionPending: false })
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}