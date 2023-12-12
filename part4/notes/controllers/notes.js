const notesRouter = require('express').Router()
const Note = require('../models/note')
const mongoose = require('mongoose')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
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

notesRouter.post('/', async (request, response) => {
    const body = request.body

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })

    if (note.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const savedNote = await note.save()
    response.json(savedNote)

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