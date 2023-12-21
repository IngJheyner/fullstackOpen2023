import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {

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

    return (
        <div
        style={ blogStyle }>

            <div>

                {blog.title} {blog.author}

                <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>

                <div style={{ display: visible ? '' : 'none' }}>

                    <p>{blog.url}</p>
                    <p>likes {blog.likes}
                    <button
                    onClick={updateBlogLikes}>
                        like
                    </button></p>
                    <p>{blog.user.name}</p>

                </div>

            </div>

        </div>
    )
}

export default Blog