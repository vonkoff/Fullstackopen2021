import React, { useState, useEffect } from 'react'
import { Persons, PersonForm, Filter, Notification} from './components/Phonebook'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = 
    useState({
      message : null,
      type: ''
    })

  const hook = () =>{
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }
    useEffect(hook,[])

  const addName = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    // Original person information found 
    const orig_person = persons.find(person => person.name === personObject.name)
    // Changed person has information put in with only new thing being the number
    const changedPerson = {...orig_person, number: personObject.number}

    console.log('changedPerson',changedPerson);
    console.log('personObject',personObject);
    console.log('orig_person',orig_person);

    if ((persons.filter(person =>
      person.name === personObject.name).length !== 0 ))
      {
        if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)) {
            phonebookService
              .update(changedPerson.id, changedPerson)
              .then(returnedPerson => {
                setPersons(persons.map(person => {
                  return person.id !== changedPerson.id ? person : returnedPerson
                }))
              })
        }
      }
    else {
    phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setNotificationMessage({
          message: `Added ${personObject.name}`,
          type: 'ok'
      })
        setTimeout(() => {
          setNotificationMessage({message: null, type: 'ok'})
        }, 5000)
      })
    }
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person}

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
        phonebookService
          .phonedelete(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.filter(person => person.id !== id ))
          })
          .catch(error => {
            setNotificationMessage({
              message: `Information of ${person.name} has already been removed from the server`,
              type: 'notok'
            })
            setTimeout(() => {
              setNotificationMessage({message: null, type: 'ok'})
            }, 5000)
          })
        }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        message={notificationMessage.message} 
        type= {notificationMessage.type}
        />

      <Filter
      newSearch={newSearch}
      handleFilterChange={handleFilterChange}
      addName={addName}
       />

      <h3>Add a new</h3>

      <PersonForm 
      addName={addName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newName={newName}
      />

      <h3>Numbers</h3>

      <Persons 
      persons={persons}
      newSearch={newSearch}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default App