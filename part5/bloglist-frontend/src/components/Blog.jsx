import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ( props ) => {

    const { blog, updateBlog, removeBlog, user } = props

    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const updateBlogLikes = () => {

        const updatedBlog = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
            id: blog.id
        }

        updateBlog(updatedBlog)
    }

    const removeBlogPost = () => {

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {

            removeBlog(blog.id)

        }

    }

    return (
        <div
            style={ blogStyle }>

            <div className='blog'>

                {blog.title} {blog.author}

                <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>

                <div style={{ display: visible ? '' : 'none' }}>

                    <p>{blog.url}</p>
                    <p>likes {blog.likes}
                        <button
                            type="button"
                            onClick={updateBlogLikes}>
                            like
                        </button></p>
                    <p>{blog.user.name}</p>

                    {user.username === blog.user.username
                        ? <button
                            type="button"
                            onClick={removeBlogPost}>remove</button>
                        : null}

                </div>

            </div>

        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog