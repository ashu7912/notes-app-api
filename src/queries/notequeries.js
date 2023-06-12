
const addNotes = 'INSERT INTO notes (owner_id, title, description, shared_users) VALUES ($1, $2, $3, $4) RETURNING *';
// const getNotes = 'SELECT u.firstname, u.lastname, n.note_id, n.owner_id, n.title, n.description, n.shared_users FROM notes n JOIN users u ON (owner_id = $1 OR $1 = ANY (shared_users))';
const getNotes = 'SELECT * FROM notes WHERE (owner_id = $1 OR $1 = ANY (shared_users)) ORDER BY note_id DESC';
const assignNotes = 'UPDATE notes SET shared_users = $1 WHERE note_id = $2';
const deleteNote = 'DELETE FROM notes WHERE note_id = $1';

module.exports = {
    addNotes,
    getNotes,
    assignNotes,
    deleteNote
}