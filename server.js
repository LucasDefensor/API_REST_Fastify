import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js' // usado para memoria local
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
//const database = new DatabaseMemory()     // usado para memoria local
const database = new DatabasePostgres()

server.post('/audios', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/audios', async (request) => {
    const search = request.query.search
    const audios = await database.list(search)

    return audios
})

server.put('/audios/:id', async (request, reply) => {
    const audioId = request.params.id
    const { title, description, duration } = request.body

    await database.update(audioId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/audios/:id', async (request, reply) => {
    const audioId = request.params.id

    await database.delete(audioId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})

//npm run dev - iniciar