const notesRouter = require('express').Router()
const Note = require('../models/note')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
                            .populate('user', { username: 1, name: 1 })
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {

    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        return response.status(400).send({ error: 'malformatted id' })
    }

    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

notesRouter.post('/', async (request, response, next) => {

    try{

        const body = request.body

        const token = getTokenFrom(request)

        const decodedToken = jwt.verify(token, process.env.SECRET)

        console.log("decodedToken", decodedToken)

        if (!token || !decodedToken.id) {

            return response.status(401).json({ error: 'token missing or invalid' })

        }

        const user = await User.findById(decodedToken.id)

        const note = new Note({
            content: body.content,
            important: body.important || false,
            date: new Date(),
            user: user._id
          })

          if (note.content === undefined) {
              return response.status(400).json({ error: 'content missing' })
          }

          const savedNote = await note.save()
          user.notes = user.notes.concat(savedNote._id)
          await user.save()

          response.json(savedNote)
    }
    catch(error) {

        next(error)
    }

})

notesRouter.put('/:id', (request, response, next) => {

    const body = request.body

    const note = {
      content: body.content,
      important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = notesRouter