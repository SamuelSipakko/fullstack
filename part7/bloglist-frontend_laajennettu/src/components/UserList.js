import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const UserList = ({ users }) => {

  if (users.length === 0)
    return <h3 className="side-margins">Found no users</h3>

  return (
    <div className="side-margins" id="userlist">
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td className="user-link">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}


export default connect(state => ({ users: state.users }))(UserList)