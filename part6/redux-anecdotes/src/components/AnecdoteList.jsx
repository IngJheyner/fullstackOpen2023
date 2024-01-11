import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

export const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(({anecdote, filter}) => {
        if ( filter === '' ) {
            return anecdote
        } else {
            return anecdote.filter(anecdote => anecdote.content.includes(filter))
        }
    })
    
    const vote = (id) => {
        //console.log('vote', id)
        dispatch(newVote(id))
    }

    return <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
    </>
}
