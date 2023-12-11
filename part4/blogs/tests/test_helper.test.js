import Blog from '../models/blog'

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

export default { initialBlogs, blogsInDb }