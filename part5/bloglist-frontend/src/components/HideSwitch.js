import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const HideSwitch = React.forwardRef((props,ref) => {
  const [visible, setVisibility] = useState(false)

  const toggleVisibility = () => setVisibility(!visible)

  const showWhenVisible = { display: visible ? "" : "none" }

  useImperativeHandle(ref, () => toggleVisibility)

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <button onClick={toggleVisibility}>
        {visible ? "cancel" : props.buttonLabel}
      </button>
    </div>
  )
})

HideSwitch.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default HideSwitch