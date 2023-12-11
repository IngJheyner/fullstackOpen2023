import { Router } from "express"
const blogsRouter = Router()
import Blog from "../models/blog.js"

blogsRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
        .catch(error => next(error))
    res.json(blogs)
})

blogsRouter.post('/', (req, res, next) => {

    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => next(error))
})

export default blogsRouter

