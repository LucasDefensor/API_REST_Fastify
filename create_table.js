import { sql } from './db.js';

// sql `DROP TABLE IF EXISTS audio;`.then(() =>{
//     console.log("TABELA APAGADA")
// })

sql`
    CREATE TABLE audio (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        description TEXT,
        duration    INTEGER
    );
`.then(() => {
    console.log('TABELA CRIADA!');
}).catch((error) => {
    console.error('Erro ao criar tabela: ', error);
});