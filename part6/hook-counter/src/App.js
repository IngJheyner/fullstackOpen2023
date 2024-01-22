// import { useReducer } from 'react'
// import { useContext } from 'react'
// import CounterContext from './CounterContext'

// const counterReducer = (state, action) => {
//   switch (action.type) {
//     case "INC":
//         return state + 1
//     case "DEC":
//         return state - 1
//     case "ZERO":
//         return 0
//     default:
//         return state
//   }
// }

// const Display = () => {

//     const [counter] = useContext(CounterContext)

//     return <div>{counter}</div>
//   }

// const Button = ({ type, label }) => {
//     const [dispatch] = useContext(CounterContext)
// return (
//     <button onClick={() => dispatch({ type })}>
//     {label}
//     </button>
// )
// }

// const App = () => {
//   const [counter, counterDispatch] = useReducer(counterReducer, 0)

//   return (
//     <CounterContext.Provider value={[counter, counterDispatch]}>
//       <Display counter={counter}/>
//       <div>
//         <Button type='INC' label='+' />
//         <Button type='DEC' label='-' />
//         <Button type='ZERO' label='0' />
//       </div>
//     </CounterContext.Provider>
//   )
// }

// export default App

import Display from './components/Display'
import Button from './components/Button'

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App