import { Router } from "express"
const blogsRouter = Router()
import Blog from "../models/blog.js"
import mongoose from "mongoose"
import middleware from "../utils/middleware.js"

blogsRouter.get('/', async (req, res) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => { // El middleware userExtractor se encarga de extraer el token del usuario que hace la petición

    const body = req.body
    const user = req.user

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

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => { // El middleware userExtractor se encarga de extraer el token del usuario que hace la petición

    const id = req.params.id

    const blog = await Blog.findById(id)

    const user = req.user

    if (blog.user.toString() !== user.id.toString()) {

        return res.status(403).json({ error: 'only the creator can delete the blog' })

    }

    await Blog.findByIdAndDelete(id)

    res.status(204).end()

})

export default blogsRouter

