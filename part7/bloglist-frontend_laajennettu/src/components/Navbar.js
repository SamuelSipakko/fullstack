import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../reducers/userReducer"
import { setNotification } from "../reducers/notificationReducer"
import useDarkMode from "../hooks/useDarkMode"

const Navbar = ({ user, logout, setNotification }) => {

  const darkMode = useDarkMode()

  const logUserOut = () => {
    window.localStorage.removeItem("loggedUser")
    logout()
    setNotification("logged out")
  }

  return (
    <div className="navbar">
      {user && <>
        <span><Link to="/" className="link">blogs</Link></span>
        <span><Link to="/users" className="link">users</Link></span>
        <span>{user.name} logged in</span>
        <span><button onClick={logUserOut} className="icon">logout</button></span>
      </>}
      <span>
        <button onClick={darkMode.setLight} className="icon">☀</button>
        <label className="switch">
          <input type="checkbox" checked={darkMode.state} onChange={darkMode.toggle} />
          <em className="slider" />
        </label>
        <button onClick={darkMode.setDark} className="icon">☾</button>
      </span>
    </div>
  )
}


const dispatchProps = {
  logout,
  setNotification
}

export default connect(state => ({ user: state.user }), dispatchProps)(Navbar)