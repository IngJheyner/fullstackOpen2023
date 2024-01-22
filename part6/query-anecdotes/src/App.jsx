import AnecdoteForm from './components/AnecdoteForm'
import { NotificationContextProvider } from './NotificacionContext'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests.js'

import { useNotification } from './NotificacionContext'

const App = () => {

    const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

    const { notificationDispatch } = useNotification()
    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1,
        })

        notificationDispatch({
            type: 'SET_NOTIFICATION',
            payload: `You voted for ${anecdote.content}`,
        })

        setTimeout(() => {
            notificationDispatch({
                type: 'CLEAR_NOTIFICATION',
            })
        }, 5000)
    }

//   const anecdotes = [
//     {
//       "content": "If it hurts, do it more often",
//       "id": "47145",
//       "votes": 0
//     },
//   ]

    const result = useQuery('anecdotes', getAnecdotes, {
        retry: false,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <div>Loading...</div>
    }

    if (result.isError) {
        return <div>Anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>


        <Notification />


      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
