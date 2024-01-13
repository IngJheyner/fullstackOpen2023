import { useSelector, useDispatch } from 'react-redux'
//import { vote } from '../reducers/anecdoteReducer'
//import { notificationChange, clearNotification } from '../reducers/notificationReducer'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(({anecdotes, filter}) => {
        if ( filter === '' ) {
            return anecdotes
        } else {
            return anecdotes.filter(anecdote => anecdote.content.includes(filter))
        }
    })

    const newVote = (id) => {
        //console.log('vote', id)
        //dispatch(vote(id))
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)

        dispatch(voteAnecdote(anecdote))

        // dispatch(notificationChange(`you voted '${anecdote.content}'`))

        // setTimeout(() => {
        //     dispatch(clearNotification())
        // }, 5000)

        // Redus thunk
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => newVote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
    </>
}
