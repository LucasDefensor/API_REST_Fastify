import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemory()

server.post('/audios', (request, reply) => {
    const { title, description, duration } = request.body

    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/audios', (request) => {
    const search = request.query.search
    const audios = database.list(search)

    return audios
})

server.put('/audios/:id', (request, reply) => {
    const audioId = request.params.id
    const { title, description, duration } = request.body

    database.update(audioId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/audios/:id', (request, reply) => {
    const audioId = request.params.id

    database.delete(audioId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})

//npm run dev - iniciar