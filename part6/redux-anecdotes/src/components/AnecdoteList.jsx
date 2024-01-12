import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange, clearNotification } from '../reducers/notificationReducer'

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
        dispatch(vote(id))

        dispatch(notificationChange(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
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
