import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'


const Note = ({ note, handleUpdate }) => {

    const toggleImportance = () => {
        const changedNote = {
            ...note,
            important: !note.important
        }

        handleUpdate(note.id, changedNote);
    }

    return(
        <li onClick={toggleImportance}>
        {note.content}
        <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

const Notes = () => {

  const dispatch = useDispatch()

  const notes = useSelector(({ filter, notes }) => {

    if ( filter === 'ALL' ) {
      return notes
    }
    return filter  === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

    const handleUpdate = async (id, changedNote) => {
        dispatch(toggleImportanceOf(id))
        // await noteService
        //     .update(id, changedNote)
        //     .then(returnedNote => {
        //         dispatch(toggleImportanceOf(id))
        //     })
    }

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleUpdate={handleUpdate}
        />
      )}
    </ul>
  )
}

export default Notes