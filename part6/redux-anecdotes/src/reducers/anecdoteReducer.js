import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

//const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      vote(state, action) {
        const id = action.payload
        const anecdoteToChange = state.find(n => n.id === id)
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        ).sort((a, b) => b.votes - a.votes) // Ordena las anécdotas por número de votos
      },
      create(state, action) {
        const content = action.payload
        // state.push({
        //   content,
        //   votes: 0,
        //   id: getId(),
        // })
        state.push(content)

        return state.sort((a, b) => b.votes - a.votes) // Ordena las anécdotas por número de votos
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    },
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export default anecdoteSlice.reducer