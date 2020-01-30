import React, { useState } from "react"
import PropTypes from "prop-types"

const HideSwitch = (props) => {
  const [visible, setVisibility] = useState(false)

  const toggleVisibility = () => setVisibility(!visible)

  const showWhenVisible = { display: visible ? "" : "none" }


  return (
    <div className={`hide-switch ${visible ? "create-form" : ""}`}>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <button onClick={toggleVisibility}>
        {visible ? "cancel" : props.buttonLabel}
      </button>
    </div>
  )
}

HideSwitch.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default HideSwitch