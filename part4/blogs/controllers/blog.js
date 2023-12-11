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

    const savedBlog = await blog.save()
        .catch(error => next(error))

    res.status(201).json(savedBlog)
})

export default blogsRouter

