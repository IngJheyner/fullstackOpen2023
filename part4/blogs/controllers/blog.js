import { Router } from "express"
const blogsRouter = Router()
import Blog from "../models/blog.js"

blogsRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
        .catch(error => next(error))
    res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {

    const blog = new Blog(req.body)

    try {
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    }
    catch (error) {
        next(error)
        res.status(400).end()
    }
})

export default blogsRouter

