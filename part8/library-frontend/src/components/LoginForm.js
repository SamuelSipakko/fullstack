import React from 'react'

const LoginForm = ({ show, login, setToken }) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await login({
      variables: {
        username: event.target.username.value,
        password: event.target.password.value
      }
    })
    if (result) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }

  if (!show)
    return null

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username <input id="username" />
      </div>
      <div>
        password <input id="password" type="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm