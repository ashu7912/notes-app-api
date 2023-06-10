
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const checkByEmailPass = 'SELECT * FROM users WHERE email = $1';
const getUserByToken = 'SELECT * FROM users WHERE token = $1';
const getAllUsers = 'SELECT * FROM users';
const getAllOtherUsers = 'SELECT user_id, firstname, lastname, email, dob FROM users WHERE user_id != $1';
const addUser = 'INSERT INTO users (firstname, lastname, email, password, dob, token) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
const deleteMe = 'DELETE FROM users WHERE user_id = $1'
const deleteNotes = 'DELETE FROM notes WHERE owner_id = $1'

module.exports = {
    checkEmailExists,
    checkByEmailPass,
    getUserByToken,
    getAllUsers,
    getAllOtherUsers,
    addUser,
    deleteMe,
    deleteNotes
}