import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notifications } from './components/Notifications'
import './index.css'
import { Togglable } from './components/Togglable'
import { BlogForm } from './components/BlogForm'

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState({ message: null, type: null })

    const blogFormRef = useRef()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {

                const blogs = await blogService.getAll()
                setBlogs( blogs.sort((a, b) => b.likes - a.likes) )

            }
            catch (error) {

                console.log('Error fetching blogs', error)

            }
        }

        fetchBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {

        event.preventDefault()

        try {

            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (error) {

            const { response } = error
            setErrorMessage({ message: response.data.error, type: 'error' })
            setTimeout(() => {
                setErrorMessage({ message: null, type: null })
            }, 5000)

        }

    }

    const handleLogout = async (event) => {

        event.preventDefault()

        try {

            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)

        } catch (error) {

            console.log('Error logging out')

        }

    }

    const addBlog = async ( blogObject ) => {

        try {

            const blog = await blogService.create( blogObject )

            setBlogs(blogs.concat(blog))

            setErrorMessage({ message: `A new blog ${blog.title} by ${blog.author} added`, type: 'success' })
            setTimeout(() => {
                setErrorMessage({ message: null, type: null })
            }, 5000)

            blogFormRef.current.toggleVisibility()

        }
        catch (error) {

            console.log('Error creating blog', error)

        }

    }

    const updateBlog = async ( blogObject ) => {

        try {

            const blog = await blogService.update( blogObject )

            setBlogs(blogs.map(b => b.id === blog.id ? blog : b))

        }
        catch (error) {

            console.log('Error updating blog', error)

        }

    }

    const removeBlog = async ( id ) => {

        try {

            await blogService
                .remove( id )

            setBlogs(blogs.filter(b => b.id !== id))

        }
        catch (error) {

            console.log('Error removing blog', error)

        }

    }

    if (user === null) {

        return (
            <div>
                <h2>Log in to application</h2>
                <Notifications info={errorMessage} />
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                            id='username'
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                            id='password'
                        />
                    </div>
                    <button type="submit"
                        id='login-button'
                    >login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notifications info={errorMessage} />
            <p>{user.name} logged-in
                <button
                    onClick={handleLogout}>logout
                </button>
            </p>

            <Togglable
                buttonLabel='new blog'
                ref={ blogFormRef }
            >

                <BlogForm
                    createBlog={ addBlog }
                />

            </Togglable>

            <br />

            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    removeBlog={removeBlog}
                    user={user}
                />
            )}
        </div>
    )
}

export default App