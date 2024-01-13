import { useDispatch } from 'react-redux'
//import { create } from '../reducers/anecdoteReducer'
import { notificationChange, clearNotification } from '../reducers/notificationReducer'

//import anecdoteService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async  (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        //console.log('add', content)
        //dispatch(create(content))
        // const newAnecdote = await anecdoteService.createNew(content)
        // dispatch(create(newAnecdote))
        dispatch(createAnecdote(content))
        dispatch(notificationChange(`you created '${content}'`))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return <>
        <h2>create new</h2>
        <form
        onSubmit={ addAnecdote }>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
    </>
}