import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #audio = new Map()

    list(search) {
        return Array.from(this.#audio .entries())
        .map((audioArray) => {
            const id = audioArray[0]
            const data = audioArray[1]

            return {
                id,
                ...data,
            }
        })
        .filter(audio => {
            if(search) {
                return audio.title.includes(search)
            }

            return true
        })
    }

    create(audio) {
        const audioId = randomUUID()

        this.#audio.set(audioId, audio)
    }

    update(id, audio) {
        this.#audio.set(id, audio)
    }

    delete(id) {
        this.#audio.delete(id)
    }
}