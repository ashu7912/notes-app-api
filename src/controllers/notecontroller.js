const pool = require('../postgres/db');
//External Libraries --------------------------------

const response = require('../response/response');
const queries = require('../queries/notequeries');
//Internal Files ------------------------------------


const addNote = async (req, res) => {
    try {
        const requestBody = req.body;
        if (!requestBody.title) {
            return res.status(400).json({ message: response.noteTitleRequired })
        }
        const { title, description } = requestBody;
        const result = await pool.query(queries.addNotes, [req.user.user_id, title, description, []]);
        const note = result.rows[0];
        res.send({
            ...response.successObject,
            message: response.noteCreatedSuccess,
            data: note
        })
    } catch (error) {
        res.status(500).send()
    }
}

const getNotes = async (req, res) => {
    try {
        const user = req.user;
        const result = await pool.query(queries.getNotes, [user.user_id]);
        const notes = result.rows;
        res.send({
            ...response.successObject,
            data: notes
        })

    } catch (error) {
        res.status(500).send()
    }
}

const assignNote = async (req, res) => {
    try {
        const { shared_users } = req.body;
        const noteId = parseInt(req.params.id);
        await pool.query(queries.assignNotes, [shared_users, noteId]);
        res.send({
            ...response.successObject,
            message: response.noteAssignedSuccess
        })
    } catch (error) {
        res.status(500).send()
    }
}

const updateNote = async (req, res) => {
    try {
        const fields = req.body;
        const noteId = parseInt(req.params.id);

        const updates = Object.keys(fields);
        const allowedUpdates = ['title', 'description'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({ message: response.badRequest });
        }
        const values = Object.values(fields);
        const updateFields = updates
            .map((key, index) => `${key} = $${index + 1}`)
            .join(', ');
        const updateUserQuery = `UPDATE notes SET ${updateFields} WHERE note_id = ${noteId}`;
        await pool.query(updateUserQuery, values);

        res.send({
            ...response.successObject,
            message: response.noteUpdatedSuccess
        })
    } catch (error) {
        res.status(500).send()
    }
}

const deleteNote = async (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        await pool.query(queries.deleteNote, [noteId]);
        res.send({
            ...response.successObject,
            message: response.noteDeletedMessage
        })
    } catch(error) {
        res.status(500).send()
    }
}

module.exports = {
    addNote,
    getNotes,
    assignNote,
    updateNote,
    deleteNote
}