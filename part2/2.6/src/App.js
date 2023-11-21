import React, { useState, useEffect } from 'react'
import personService from './services/person'
import './index.css'

const Filter = ({search, handleSearchChange}) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleSearchChange}/>
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, removePerson}) => {

  return (
    <div>
      {personsToShow.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
      </div>)}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([])

  useEffect(() => {
    console.log('effect executed')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ Message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (persons.some(person => person.name === newName)) {

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
          .catch(error => {
            setError(
              `Information of ${person.name} has already been removed from server`
            )

            setTimeout(() => {
              setError(null)
            } , 5000)
          })

        if (error !== null) {
          return
        } else {
          setMessage(
            `Updated ${newName}`
          )

          setTimeout(() => {
            setMessage(null)
          } , 5000)
        }
      }

      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      });

    setMessage(
      `Added ${newName}`
    )

    setTimeout(() => {
      setMessage(null)
    } , 5000)
    //setPersons(persons.concat(personObject))

    // setNewName('')
    // setNewNumber('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    //console.log(event.target.value)
    setSearch(event.target.value)
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .destroy(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {error !== null}
        <ErrorNotification message={error}/>
      {Message !== null}
        <Notification message={Message}/>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App