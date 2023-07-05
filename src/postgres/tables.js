
const pool = require('../postgres/db');

async function createUserTable() {
    try {
        const createTableQuery = `
            CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              firstname VARCHAR(255) NOT NULL,
              lastname VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              dob DATE,
              password TEXT NOT NULL,
              token TEXT NOT NULL
              )
              `;
        await pool.query(createTableQuery);
        pool.release();
        console.log('User table created or already exists');
    } catch (err) {
        // console.error('Error creating user table', err);
    }
}
async function createNotesTable() {
    try {
        const createTableQuery = `
        CREATE TABLE notes (
            note_id SERIAL PRIMARY KEY,
            owner_id INTEGER NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            shared_users INTEGER[]
            )
              `;
        await pool.query(createTableQuery);
        pool.release();
        console.log('User table created or already exists');
    } catch (err) {
        // console.error('Error creating user table', err);
    }
}

module.exports = {
    createUserTable,
    createNotesTable
}