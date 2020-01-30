import React from "react"
import { connect } from "react-redux"

const Notification = (props) => {
  if (!props.notification)
    return null
  const error = props.notification.success ? "" : "error"
  return (
    <div className={`notification ${error}`}>
      <b>{props.notification.text}</b>
    </div>
  )
}

const stateProps = (state) => ({
  notification: state.notification
})

export default connect(stateProps)(Notification)