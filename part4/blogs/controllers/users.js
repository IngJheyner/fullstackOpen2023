import bcrypt from 'bcrypt'
import User from '../models/user.js'
import express from 'express'
const usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {

    const body = request.body

    if (body.password.length < 3) {

        return response.status(400).json({
            error: 'password must be at least 3 characters long'
        })

    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({

        username: body.username,
        name: body.name,
        passwordHash,

    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

export default usersRouter