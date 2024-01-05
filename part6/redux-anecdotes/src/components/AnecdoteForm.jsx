import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        //console.log('add', content)
        dispatch(newAnecdote(content))
    }

    return (
        <form
        onSubmit={ addAnecdote }>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
    )
}