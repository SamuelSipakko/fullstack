import React from 'react'

const Filter = ({val,handle}) => {
    return (
      <div>
        filter shown with:&nbsp;&nbsp;
        <input value={val} onChange={handle}/>
      </div>
    )
}

export default Filter