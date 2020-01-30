import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({ username, password, handleLogin }) => (
  <form onSubmit={handleLogin} className="login">
    <table>
      <tbody>
        <tr>
          <td>username</td>
          <td><input {...username.inputParams} id="username"/></td>
        </tr>
        <tr>
          <td>password</td>
          <td><input {...password.inputParams} id="password"/></td>
        </tr>
      </tbody>
    </table>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm