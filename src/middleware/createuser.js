const pool = require('../postgres/db');
//External Libraries --------------------------------

const queries = require('../queries/userqueries');
const response = require('../response/response');
const encryptPassword = require('./encryptPass');
const generateAuthToken = require('./authtoken');
//Internal Files ------------------------------------


const createUserMiddleware = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, dob } = req.body;
        const userExist = await pool.query(queries.checkEmailExists, [email]);
        if (userExist.rows.length) {
            return res.status(401).json({ message: response.emailExistMessage});
        }

        const token = generateAuthToken(firstname);
        const encryptedPass = await encryptPassword(password);
        
        const result = await pool.query(queries.addUser, [firstname, lastname, email, encryptedPass, dob, token]);
        
        // Generate a JWT token for the created user
        const user = result.rows[0];
        delete user.token;
        delete user.password;
        
        req.token = token
        req.user = user
        // Continue to the next middleware or route
        next();
    } catch (error) {
        res.status(400).send({
            ...response.failedObject,
            message: response.emailExistMessage
        });
    }
};

module.exports = createUserMiddleware;