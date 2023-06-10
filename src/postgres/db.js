const Pool = require('pg').Pool;
//External Libraries --------------------------------

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'notesappdb',
//     password: '123456',
//     port: 5432
// })

const pool = new Pool({
    user: 'notesappdb_user',
    host: 'dpg-ci2dmnrhp8u1a1a2ivs0-a',
    database: 'notesappdb',
    password: 'HwaPD6OAd3elYO9j8FbxPY3kUvls2Gyg',
    port: 5432
})


module.exports = pool;