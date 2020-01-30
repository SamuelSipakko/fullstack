import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = ({text, value}) => {
    return <tr>
            <td>{text}</td>
            <td>{value}</td>
           </tr>
}

const Statistics = ({good,neutral,bad}) => {
    const all = good + neutral + bad
    if(all !== 0) {
        return(
        <table>
          <tbody>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="all" value={all}/>
            <Statistic text="average" value={(good-bad)/all}/>
            <Statistic text="positive" value={(good*100.0/all) + " %"}/>
          </tbody>
        </table>
        )
    }
    return(
    <div>
        <p>No feedback given</p>
    </div>
    )
}

const Button = ({handling, text}) => {
    return <button onClick={handling}>{text}</button>
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const clickGood = () => {
        setGood(good + 1)
    }
    const clickNeutral = () => {
        setNeutral(neutral + 1)
    }
    const clickBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
        <h1>give feedback</h1>
        <div>
            <Button handling={clickGood} text="good"/>
            <Button handling={clickNeutral} text="neutral"/>
            <Button handling={clickBad} text="bad"/>
        </div>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)