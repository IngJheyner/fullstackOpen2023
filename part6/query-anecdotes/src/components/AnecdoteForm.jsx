import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests.js'
import React, { useContext } from 'react'
import { useNotification } from '../NotificacionContext.jsx'

const AnecdoteForm = () => {

    const { notificationDispatch } = useNotification()

    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: (newAnecdote) => {
            queryClient.setQueryData('anecdotes', (oldAnecdotes) => [
                ...oldAnecdotes,
                newAnecdote,
            ])
        }
    })

    const onCreate = (event) => {

        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        //console.log('new anecdote')
        newAnecdoteMutation.mutate({ content })

        notificationDispatch({
            type: 'SET_NOTIFICATION',
            payload: `Anecdote ${content} created!`,
        })

        setTimeout(() => {
            notificationDispatch({
                type: 'CLEAR_NOTIFICATION',
            })
        }, 5000)
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
