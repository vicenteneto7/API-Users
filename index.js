const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()

app.use(express.json())



const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "user not found" })
    }
    request.userIndex = index
    request.userId = id

    next()

}

app.get('/users', (request, response) => {

    return response.json(users)

})
app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const userUpdate = { id, name, age }
    const index = request.userIndex
    const id = request.userId

    users[index] = userUpdate

    return response.status(201).json(userUpdate)


    //me retorna a posição do user no array//

})

app.delete('/users/:id', checkUserId, (request, response) => {
    const { id } = request.params
    const userDelete = { id }

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "user not found" })
    }
    users.splice(index, 1)
    return response.status(204).json(userDelete)


})

app.listen(port, () => {
    console.log(`server started on ${port}`)
})