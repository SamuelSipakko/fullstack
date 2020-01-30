import React from "react"

const Notification = ({ msg }) => {
  const className = msg.error ? "error" : "success"
  return (
    <div className={className}>
      <b>{msg.error ? msg.error : msg.success}</b>
    </div>
  )
}

export default Notification