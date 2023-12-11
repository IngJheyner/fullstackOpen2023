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

afterAll(() => {
    mongoose.connection.close()
})

