import React from 'react'
import './button.css'



const Button = ({handle,text,type}) => {  // 'type' used to distinguish 'submit'
    if(type === undefined) {              // button from other (manually-defined) buttons
        return (
            <button onClick={handle}>
                {text}
            </button>
        )
    }
  return (
    <button type={type}>
        {text}
    </button>
  )
}


export default Button