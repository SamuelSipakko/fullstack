import React from 'react'
import Part from "./Part"

const Content = ({parts,state}) => {
    return (
        <table>
          <tbody>
            {parts.map(({name,exercises},i)=> <Part key={i} name={name} exercises={exercises} state={state} />)}
          </tbody>
        </table>
    )
}


export default Content