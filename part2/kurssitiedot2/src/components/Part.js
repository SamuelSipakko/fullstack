import React from 'react'

const Part = ({name,exercises,state}) => {
    if(state) return <tr><td>{name}</td><td>{exercises}</td></tr>
    return <tr><td>{name} {exercises}</td></tr>
}


export default Part