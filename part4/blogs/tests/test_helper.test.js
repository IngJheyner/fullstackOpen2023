import Blog from '../models/blog'
import User from '../models/user'

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2',
        likes: 0
    },
    {
        title: 'Browser can execute only Javascript',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2',
        likes: 2
    }
]

const initialUsers = [
    {
        username: 'hellas',
        name: 'Arto Hellas',
        password: '1234'
    },
    {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: '1234'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

export default { initialBlogs, blogsInDb, initialUsers, usersInDb }