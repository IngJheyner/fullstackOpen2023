import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// const Hello = (props) => {
//   return (
//     <div>
//       <p>Hello world {props.name}, you are {props.age} years old</p>
//     </div>
//   );
// };

// const App = () => {
//   const name = 'Peter';
//   const age = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="David" age={26 + 10}/>
//       <Hello name={name} age={age}/>
//     </div>
//   );
// }

// const Header = (props) => {
//   return (
//     <div>
//       <h1>{props.course}</h1>
//     </div>
//   );
// };

// const Content = (props) => {
//   return (
//     <div>
//       <p>{props.part1} {props.exercises1}</p>
//       <p>{props.part2} {props.exercises2}</p>
//       <p>{props.part3} {props.exercises3}</p>
//     </div>
//   );
// }

// const Total = (props) => {
//   return (
//     <div>
//       <p>Number of exercises {props.total}</p>
//     </div>
//   );
// }

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course}/>
//       <Content
//         part1={part1} exercises1={exercises1}
//         part2={part2} exercises2={exercises2}
//         part3={part3} exercises3={exercises3}/>
//       <Total total={exercises1 + exercises2 + exercises3}/>
//     </div>
//   )
// }

// const Hello = (props) => {

//   const bornYear = () => {
//     const yearNow = new Date().getFullYear()
//     return yearNow - props.age
//   }

//   return (
//     <div>
//       <p>
//         Hello {props.name}, you are {props.age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {

  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text='plus'/>
      <Button handleClick={setToZero} text='zero'/>
      <Button handleClick={decreaseByOne} text='minus'/>
    </div>
  )
}

let counter = 1

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);