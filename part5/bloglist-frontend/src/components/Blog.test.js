// import React from 'react'
//import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog.jsx'

test('renders content', () => {

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Jest',
        url: 'www.jest.com',
        likes: 5,
        user: {
            username: 'root',
            name: 'Superuser',
            id: '5f6f7c9c3b1c4b1f9c6c2a9e'
        }
    }

    const user = {
        username: 'root',
        name: 'Superuser',
        id: '5f6f7c9c3b1c4b1f9c6c2a9e'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog
            blog={blog}
            updateBlog={mockHandler}
            removeBlog={mockHandler}
            user={user} />
    )

    //component.debug()
    // const div = component.container.querySelector('.blog')
    // console.log(prettyDOM(div))

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

})

test('clicking the button shows url and likes', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Jest',
        url: 'www.jest.com',
        likes: 5,
        user: {
            name: 'Test User',
            username: 'testuser'
        }
    }

    const user = {
        username: 'root',
        name: 'Superuser',
        id: '5f6f7c9c3b1c4b1f9c6c2a9e'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog
            blog={blog}
            updateBlog={mockHandler}
            removeBlog={mockHandler}
            user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
})

test('clicking the like button twice calls event handler twice', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Jest',
        url: 'www.jest.com',
        likes: 5,
        user: {
            name: 'Test User',
            username: 'testuser'
        }
    }

    const user = {
        username: 'root',
        name: 'Superuser',
        id: '5f6f7c9c3b1c4b1f9c6c2a9e'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog
            blog={blog}
            updateBlog={mockHandler}
            removeBlog={mockHandler}
            user={user} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
})