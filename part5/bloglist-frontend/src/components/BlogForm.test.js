import { render, fireEvent } from '@testing-library/react'
import { BlogForm } from './BlogForm'

test('form calls the event handler it received as props with the right details when a new blog is created', () => {

    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const inputTitle = component.container.querySelector('input[name="title"]')
    const inputAuthor = component.container.querySelector('input[name="author"]')
    const inputUrl = component.container.querySelector('input[name="url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
        target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(inputAuthor, {
        target: { value: 'Test Author' }
    })
    fireEvent.change(inputUrl, {
        target: { value: 'www.testurl.com' }
    })
    fireEvent.submit(form)

    expect(createBlog).toHaveBeenCalledWith({
        title: 'testing of forms could be easier',
        author: 'Test Author',
        url: 'www.testurl.com'
    })
})