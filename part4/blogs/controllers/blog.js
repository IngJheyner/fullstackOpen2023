import { Router } from "express"
const blogsRouter = Router()
import Blog from "../models/blog.js"
import mongoose from "mongoose"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

blogsRouter.get('/', async (req, res) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    res.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (req, res) => {

    const body = req.body

    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()

    res.status(201).json(savedBlog)

})

blogsRouter.put('/:id', async (req, res, next) => {

    const id = req.params.id
    const blog = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next({ name: 'CastError', message: 'malformatted id' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
                            .catch(error => next(error))
    res.json(updatedBlog)

})

blogsRouter.delete('/:id', async (req, res, next) => {

    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next({ name: 'CastError', message: 'malformatted id' })
    }

    await Blog.findByIdAndDelete(id)
    res.status(204).end()

})

export default blogsRouter

