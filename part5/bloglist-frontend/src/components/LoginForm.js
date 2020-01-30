import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({ username, password, handleLogin }) => (
  <form onSubmit={handleLogin} className="login">
    <div>
      username &nbsp;
      <input {...username.withoutReset}/>
    </div>
    <div>
      password &nbsp;
      <input {...password.withoutReset}/>
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm