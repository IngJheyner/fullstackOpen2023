import { useState, useEffect, useRef } from 'react'
import Note from './components/Note.js'
import Notification from './components/Notification.js'
import Footer from './components/Footer.js'
import noteService from './services/notes.js'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'
import NoteForm from './components/NoteForm.jsx'

const App = () => {

    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const noteFormRef = useRef()

    useEffect(() => {
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    // Agregar notas
    const addNote = (noteObject) => {

        // Se llama al metodo toggleVisibility del componente Togglable para ocultar el formulario
        // Con la referencia noteFormRef se puede acceder a los metodos del componente Togglable
        noteFormRef.current.toggleVisibility()

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })

    }

    // Cambiar importancia de las notas
    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote).then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch( () => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    // Login
    const handleLogin = async (event) => {
        event.preventDefault()

        try {

            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )

            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (error) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    // Formulario de login
    const loginForm = () => {

        return (

            <Togglable buttonLabel='login'>

                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />

            </Togglable>
        )
    }

    // Formulario de notas
    const noteForm = () => (
        <Togglable
            buttonLabel='new note'
            ref={ noteFormRef }
        >
            <NoteForm
                createNote={addNote}
            >
            </NoteForm>
        </Togglable>
    )

    return (

        <div>

            <h1>Notes FrontendEnd</h1>

            <Notification message={ errorMessage } />

            {user === null && loginForm()}
            {user !== null && (
                <div>
                    <p>{user.name} logged-in</p>
                    {noteForm()}
                </div>
            )}

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
                </button>
            </div>

            <ul>
                <ul>
                    {notesToShow.map(note =>
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                        />
                    )}
                </ul>
            </ul>

            <Footer />
        </div>
    )
}

export default App
