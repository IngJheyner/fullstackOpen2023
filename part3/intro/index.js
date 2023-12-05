const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// Serviendo archivos estáticos desde la carpeta build
app.use(express.static('build'))

// Conexión a la base de datos
const Note = require('./models/note');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
  //const id = Number(request.params.id)
  Note.findById(request.params.id).then(note => {
    response.json(note)
  });

})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    note.save().then(savedNote => {
        response.json(savedNote)
    })

})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})