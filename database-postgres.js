import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DatabasePostgres {

    async list(search) {
        let audios
        
        if(search) {
            audios = await sql`SELECT * FROM audio WHERE title ILIKE ${"%" + search + "%"}`
        } else {
            audios = await sql`SELECT * FROM audio`
        }

        return audios
    }

    async create(audio) {
        const audioID = randomUUID()
        const { title, description, duration } = audio

        await sql`INSERT INTO audio (id, title, description, duration) VALUES (${audioID}, ${title}, ${description}, ${duration})`
    }

    async update(id, audio) {
        const { title, description, duration } = audio

        await sql`UPDATE audio SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM audio WHERE id = ${id}`
    }
}
