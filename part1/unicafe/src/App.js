// ***  Ex.1.11 CHECK OVER AGAINNN!!!!!!!!!!

import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.average == 0) {
      return (
        <div>
        <h1>Statistics</h1>
        <StatisticLine text="No feedback given" />
        </div>
      )
    }
    return (
      <div>
      <h1>Statistics</h1>
      <table>
      <tbody>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="average" value={props.setAverage}/>
        <StatisticLine text="positive" value={props.feedBack}/>
      </tbody>
      </table>
      </div>
    )
}

const StatisticLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const average = good + bad + neutral

  console.log(average)
  console.log(average >= 1)
  const setToValue = newValue => {
    if(newValue == "good"){
      setGood(good + 1)
    }
    else if(newValue == "neutral"){
      setNeutral(neutral + 1)
    }
    else{
      setBad(bad + 1)
    }
  }

  const setAverage = () => {
    return ((good + (bad * -1))/average)
  }

  const feedBack = () => {
    return ((good/average)*100) + "%"
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToValue("good") } text="good"/>
      <Button handleClick={() => setToValue("neutral") } text="neutral"/>
      <Button handleClick={() => setToValue("bad") } text="bad"/>
      <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      average={average}
      setAverage={setAverage()}
      feedBack={feedBack()}
      />
    </div>
  )
}

export default App