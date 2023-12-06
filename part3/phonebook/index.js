import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan("tiny"))

// Serviendo archivos estáticos desde la carpeta build
app.use(express.static('build'))

// Conexion a la base de datos
import Person from "./models/person.js"

// app.get("/info", (request, response) => {
//     const date = new Date()
//     const info = `<p>Phonebook has info for ${persons.length} people</p>
//         <p>${date}</p>`
//     response.send(info)
// });

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {

    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))

    morgan.token("body", (request) => {
        return JSON.stringify(request.body)
    })
})

app.put("/api/persons/:id", (request, response, next) => {

    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))

})

// Middleware para manejar errores de rutas no encontradas
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
  }

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})