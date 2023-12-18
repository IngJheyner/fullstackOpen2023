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

blogsRouter.post('/', async (req, res) => {

    const body = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
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

blogsRouter.delete('/:id', async (req, res) => {

    const id = req.params.id

    const blog = await Blog.findById(id)

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {

        return res.status(401).json({ error: 'token missing or invalid' })

    }

    if (blog.user.toString() !== decodedToken.id.toString()) {

        return res.status(403).json({ error: 'only the creator can delete the blog' })

    }

    await Blog.findByIdAndDelete(id)

    res.status(204).end()

})

export default blogsRouter

