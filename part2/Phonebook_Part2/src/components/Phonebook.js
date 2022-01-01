
import React from 'react'

export const Filter = ({newSearch, handleFilterChange}) =>{
    return(
      <div>
        filter shown with <input
          value={newSearch}
          onChange={handleFilterChange}
        />
      </div>
    )
}

export const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) =>{
    return(
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
           />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export const Persons = ({persons, newSearch, handleDelete}) =>{
    return(
      <ul>
        {persons.filter((person)=> {
            if (newSearch === ""){
              return person
            }
            else if (person.name.toLowerCase().includes(newSearch.toLowerCase())){
              return person
            }
          }).map((person,i) =>
            <li className='persons' key={i}>
              {person.name}
              {" "}
              {person.number}
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </li>
        )}
      </ul>
    )
}

  export const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    const notificationStyle = {
      background: 'lightgrey',
      color: type ==='ok' ? 'green' : 'red',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
