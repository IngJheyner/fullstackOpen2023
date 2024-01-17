import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, combineReducers } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'

// store.js
// import noteReducer from './reducers/noteReducer'
// import filterReducer from './reducers/filterReducer'

// import noteService from './services/notes'

// const reducer = combineReducers({
//     notes: noteReducer,
//     filter: filterReducer
// })

// const store = createStore(reducer)

// const store = configureStore({
//     reducer: {
//         notes: noteReducer,
//         filter: filterReducer,
//     },
// })

console.log(store.getState())

// noteService.getAll().then(notes =>
//     store.dispatch(setNotes(notes)),
// )

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>,
)
