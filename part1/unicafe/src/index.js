import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Statistics = ({good, neutral, bad}) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }else {

    return (
      <div>
        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>all: {good + neutral + bad}</p>
        <p>average: {isNaN((good - bad) / (good + neutral + bad)) ? 0 : (good - bad) / (good + neutral + bad)}</p>
        <p>positive: {isNaN(good / (good + neutral + bad)) ? 0 : good / (good + neutral + bad) * 100} %</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good+1)}>Good</button>
      <button onClick={() => setNeutral(neutral+1)}>Neutral</button>
      <button onClick={() => setBad(bad+1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

