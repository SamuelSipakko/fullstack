import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/List'
import Button from './components/Button';
import personService from './services/persons'
import Notification from './components/Notification';


const App = () => {
    const [ persons, setPersons] = useState([]) 
  
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNum ] = useState('')
    const [ filtering, setFilter ] = useState('')
    const [ showTable, setShowTable ] = useState(true)
    const [ notification, setNotif ] = useState(null)
  


    const newNotification = (text,isSuccessfull) => {
        setNotif({ message: text, successfull: isSuccessfull })
        setTimeout(() => setNotif(null), 7000);
    }


    const handleAdd = () => {
        personService
            .create({name: newName.trim(), number: newNumber.trim()})
            .then(newPerson => {
                setPersons(persons.concat(newPerson).sort((a,b)=> a.name.localeCompare(b.name)))
                newNotification(`Added ${newName}`, true)
                setNewName('')
                setNewNum('')
            })
            .catch(error => {
                personService.getAll().then(persons => {
                    setPersons(persons.sort((a,b)=> a.name.localeCompare(b.name)))
                })
                newNotification(error.response.data.error, false)
            })
    }


    const handleUpdate = () => {
        const toBeUpdated = persons.find(p => p.name === newName.trim())
        const updated = { ...toBeUpdated, number: newNumber.trim()}
        personService
            .update(updated.id, updated)
            .then(newOne => {
                setPersons(persons.map(p => p.id !== updated.id ? p : newOne))
                newNotification(`Changed the number of ${newName} to ${newNumber}`, true)
                setNewName('')
                setNewNum('')
            })
            .catch(error => {
                personService.getAll().then(persons => {
                    setPersons(persons.sort((a,b)=> a.name.localeCompare(b.name)))
                })
                newNotification(error.response.data.error, false)
            })
    }
    

    const deletePerson = person => () => {
        const res = window.confirm(`Are you sure you want to delete '${person.name}'?`)
        if (res) {
            personService
                .del(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p !== person))
                    newNotification(`Deleted ${person.name}`, true)
                })
                .catch(() => {
                    setPersons(persons.filter(p => p !== person))
                    newNotification(`${person.name} has already been removed from server`, false)
                })
        }
    }


    const addNumber = (event) => {
        event.preventDefault()
        function numFilter(num, idx, self) {
            return isNaN(num) && num!=='-' && self.indexOf(num) === idx
        }

        const unallowed = newNumber.trim().split('').filter(numFilter).sort()
        const personWithSameNumber = persons.find(p=> p.number === newNumber.trim())

        if (newName.length === 0)
            newNotification('No name given', false)

        else if (newNumber.length === 0)
            newNotification('No number given', false)

        else if (unallowed.length !== 0)
            newNotification(`number includes unaccepted characters: '${unallowed.join(', ')}'`, false)
        
        else if (persons.filter(p => p.name === newName.trim()).length !== 0) {
            if (personWithSameNumber !== undefined) {
                if (personWithSameNumber.name === newName.trim())
                    newNotification('A contact already exists with given data.', false)
                else 
                    newNotification(`Given phonenumber has already been registered for ${personWithSameNumber.name}`, false)
            }
            else {
                const res = window.confirm(`${newName} has already been added to the phonebook.` +
                                            ' Do you want to replace the old number with a new one?')
                if (res) 
                    handleUpdate()
            }
        }

        else if (personWithSameNumber !== undefined)
            newNotification(`Given phonenumber has already been registered for ${personWithSameNumber.name}`, false)

        else 
            handleAdd()
    }
    

    const handleName = event => setNewName(event.target.value)
  
    const handleNum = event => setNewNum(event.target.value)
  
    const handleFilter = event => setFilter(event.target.value)
  
    const handleTable = () => setShowTable(!showTable)
  

  
    useEffect(() => {
        personService
            .getAll()
            .then(persons => setPersons(persons.sort((a,b)=> a.name.localeCompare(b.name))) )
    }, [])
  
  
    return (
      <div>
        <Notification notification={notification} />
        <h2>Phonebook</h2>
        <Filter val={filtering} handle={handleFilter} />
        <h2>Add a new contact</h2>
        <Form handleAdd={addNumber}
              name={newName}
              handleName={handleName}
              num={newNumber}
              handleNum={handleNum} />
        <h2>Numbers &nbsp;&nbsp;&nbsp;
          <Button handle={handleTable} 
                  text={'show ' + (showTable ? 'linearly' : 'in table')} />
        </h2>
        <List list={persons}
              filt={filtering} 
              showTable={showTable}
              deletePerson={deletePerson} />
      </div>
    )
  
  }


  export default App