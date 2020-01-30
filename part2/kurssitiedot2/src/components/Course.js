import React from 'react'
import Header from "./Header"
import Content from "./Content"


const Course = ({course,state}) => {
    const count = course.parts.map(p=> p.exercises).reduce((a,b)=> a+b)
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} state={state} />
            <p><b>total of {count} exercises</b></p>
        </>
    )
}


export default Course