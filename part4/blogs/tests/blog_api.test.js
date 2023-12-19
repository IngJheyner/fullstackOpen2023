import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import helper from './test_helper.test.js'

const api = supertest(app)

import Blog from '../models/blog.js'
import User from '../models/user.js'

let user = null

// Antes de cada test, se vacía la base de datos y se añaden dos blogs de ejemplo
beforeEach(async () => {

    await Blog.deleteMany({})
    await User.deleteMany({})

    const userPromises = helper.initialUsers
                        .map(user => new User(user).save())

    const users = await Promise.all(userPromises)

    const blogPromises = helper.initialBlogs
                        .map(blog => {
                            blog.user = users[0]._id
                            return new Blog(blog).save()
                        })


    await Promise.all(blogPromises)

    // Actualizar el primer usuario con los blogs
    const userWithBlogs = users[0]
    userWithBlogs.blogs = blogPromises.map(blogPromise => blogPromise._id)
    await userWithBlogs.save()

    user = await helper.userLogin(api, 'hellas', '1234')

})

describe('getting blogs', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)
    })

    test('blogs have id property', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    test('likes property is set to 0 if not provided', async () => {

        const newBlog = {
            title: 'Blog de prueba',
            author: 'Miguel',
            url: 'https://www.google.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${user.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)

    })

})

describe('creating a single blog', () => {

    test('blogs are added correctly', async () => {

        const newBlog = {
            title: 'Blog de prueba',
            author: 'Miguel',
            url: 'https://www.google.com',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${user.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain('Blog de prueba')
    })

    test('blogs without title or url properties are not added', async () => {
        const newBlog = {
            author: 'Miguel',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${user.token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    })

    test('adding a blog without a valid token returns 401', async () => {
        const newBlog = {
            author: 'Miguel',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    })

})

describe('deleting blogs', () => {

    test('blogs are deleted correctly', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${user.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)

    })

    test('deleting a blog with an invalid id returns 400', async () => {
        await api
            .delete('/api/blogs/123')
            .set('Authorization', `bearer ${user.token}`)
            .expect(400)
    })

})

describe('updating blogs', () => {

    test('blogs are updated correctly', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            likes: 100
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        expect(blogsAtEnd[0].likes).toBe(100)

    })

    test('updating a blog with an invalid id returns 400', async () => {

        const updatedBlog = {
            likes: 100
        }

        await api
            .put('/api/blogs/123')
            .send(updatedBlog)
            .expect(400)

    })

})

afterAll(() => {
    mongoose.connection.close()
})

