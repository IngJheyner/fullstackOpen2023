import React from 'react'

export const BlogForm = ({ createBlog }) => {

    const addBlog = async (event) => {

        event.preventDefault()

        createBlog({
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        })

        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''

    }

    return (
        <div>
            <h1>Create new</h1>

            <form
                onSubmit={ addBlog }>
                <div>
                    title:
                    <input
                    type="text"
                    name='title'
                    />
                </div>
                <div>
                    author:
                    <input
                    type="text"
                    name='author'
                    />
                </div>
                <div>
                    url:
                    <input
                    type="text"
                    name='url'
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
