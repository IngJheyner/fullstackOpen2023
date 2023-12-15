import bcrypt from 'bcrypt'
//import User from '../models/user.js'
import express from 'express'
const usersRouter = express.Router()

const listUsers = [
    {
        username: "hellas",
        name: "Arto Hellas",
        id: "5f7a4b3d1c9d440000f3d9f5"
    },
    {
        username: "mluukkai",
        name: "Matti Luukkainen",
        id: "5f7a4b4a1c9d440000f3d9f6"
    },
    {
        username: "danabramov",
        name: "Dan Abramov",
        id: "5f7a4b531c9d440000f3d9f7"
    }
]

usersRouter.get('/', (request, response) => {
    response.json(listUsers)
})

export default usersRouter