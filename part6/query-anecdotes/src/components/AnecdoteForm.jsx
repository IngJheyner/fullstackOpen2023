import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests.js'
import { useNotify } from '../NotificacionContext.jsx'

const AnecdoteForm = () => {

    const notifyWith = useNotify()

    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: (newAnecdote) => {
            queryClient.setQueryData('anecdotes', (oldAnecdotes) => [
                ...oldAnecdotes,
                newAnecdote,
            ])
            notifyWith(`You created ${newAnecdote.content}`)
        },
        onError: (error) => {
            notifyWith(error.response.data.error)
        }
    })

    const onCreate = (event) => {

        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        //console.log('new anecdote')
        newAnecdoteMutation.mutate({ content })

    }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
