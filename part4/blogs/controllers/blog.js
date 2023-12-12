import { Router } from "express"
const blogsRouter = Router()
import Blog from "../models/blog.js"
import mongoose from "mongoose"

blogsRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
        .catch(error => next(error))
    res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {

    const blog = new Blog(req.body)

    const savedBlog = await blog.save()
                        .catch(error => next(error))
    res.status(201).json(savedBlog)
    
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

