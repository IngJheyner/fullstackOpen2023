import PropTypes from 'prop-types'

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
                        id='title'
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        name='author'
                        id='author'
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name='url'
                        id='url'
                    />
                </div>
                <button type="submit"
                    id='create-button'>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}
