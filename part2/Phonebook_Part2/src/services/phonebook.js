import axios from 'axios'
// COMMENTED OUT FOR EXERCISES STARTING AT AND AFTER 3.9
const baseUrl = "http://localhost:3001/persons"

// COMMENTED OUT FOR EXERCISES STARTING AT AND AFTER 3.11
// const baseUrl = "http://localhost:3001/api/persons"

// const baseUrl = 'api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const phonedelete = (id, newObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, phonedelete}