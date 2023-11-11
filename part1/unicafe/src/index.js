import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good - bad) / (good + neutral + bad);

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good+1)}>Good</button>
      <button onClick={() => setNeutral(neutral+1)}>Neutral</button>
      <button onClick={() => setBad(bad+1)}>Bad</button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>all: {good + neutral + bad}</p>
      <p>average: {isNaN(average) ? 0 : average}</p>
      <p>positive: {isNaN(good / (good + neutral + bad)) ? 0 : good / (good + neutral + bad) * 100} %</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

