import { Router } from "express"
const blogsRouter = Router()
import Blog from "../models/blog.js"

blogsRouter.get('/', (req, res, next) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
        })
        .catch(error => next(error))
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

