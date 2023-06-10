const pool = require('../postgres/db');
//External Libraries --------------------------------

const queries = require('../queries/userqueries');
const response = require('../response/response');
const findByCredentials = require('../middleware/verifyEmailPass');
const encryptPassword = require('../middleware/encryptPass');
//Internal Files ------------------------------------

const addUser = async (req, res) => {
    res.status(201).send({
        ...response.successObject,
        message: response.userCreatedMessage,
        data: req.user,
        token: req.token
    });

}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userObject = await findByCredentials(email, password);
        res.status(200).send({
            ...response.successObject,
            message: response.userLoggedInMessage,
            data: userObject.user,
            token: userObject.token
        });
    } catch (error) {
        res.status(400).json({
            ...response.failedObject,
            message: error.message
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const currentUser = req.user;
        const userExist = await pool.query(queries.getAllOtherUsers, [currentUser.user_id]);

        if (!userExist.rows.length) {
            return res.send({
                ...response.successObject,
                message: response.noUsersFound,
                data: []
            })
        }
        const users = userExist.rows;
        res.send({
            ...response.successObject,
            data: users
        })
    } catch (error) {
        res.send({
            ...response.failedObject,
            message: error.message
        });
    }
}


const updateUser = async (req, res) => {
    try {
        const id = req.user.user_id;
        const fields = req.body;
        const updates = Object.keys(fields);
        const allowedUpdates = ['firstname', 'lastname', 'email', 'dob', 'password'];
        if (!updates.length) {
            return res.status(400).json({ message: response.badRequest });
        }
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({ message: response.badRequest });
        }
        if (fields.email) {
            const userExist = await pool.query(queries.checkEmailExists, [fields.email]);
            if (userExist.rows.length) {
                return res.status(400).send({ message: response.emailExistMessage });
            }
        }
        if (fields.password) {
            fields.password = await encryptPassword(fields.password);
        }
        const values = Object.values(fields);


        const updateFields = updates
            .map((key, index) => `${key} = $${index + 1}`)
            .join(', ');
        const updateUserQuery = `UPDATE users SET ${updateFields} WHERE user_id = ${id}`;
        await pool.query(updateUserQuery, values);
        res.send({
            ...response.successObject,
            message: response.userUpdatedMessage
        })

    } catch (error) {
        res.status(500).send()
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = req.user;
        await pool.query(queries.deleteMe, [user.user_id]);
        await pool.query(queries.deleteNotes, [user.user_id]);
        res.send({
            ...response.successObject,
            message: response.userDeletedMessage
        })
    } catch(error) {
        res.status(500).send()
    }
}

module.exports = {
    addUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser
}