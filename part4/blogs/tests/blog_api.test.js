import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import helper from './test_helper.test.js'

const api = supertest(app)

import Blog from '../models/blog.js'

// Antes de cada test, se vacía la base de datos y se añaden dos blogs de ejemplo
beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
                        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

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

test('blogs are added correctly', async () => {
    const newBlog = {
        title: 'Blog de prueba',
        author: 'Miguel',
        url: 'https://www.google.com',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Blog de prueba')
})

test('likes property is set to 0 if not provided', async () => {
    const newBlog = {
        title: 'Blog de prueba',
        author: 'Miguel',
        url: 'https://www.google.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)

})

test('blogs without title or url properties are not added', async () => {
    const newBlog = {
        author: 'Miguel',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

afterAll(() => {
    mongoose.connection.close()
})

