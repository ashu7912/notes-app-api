const bcrypt = require('bcryptjs');
//External Libraries --------------------------------

const pool = require('../postgres/db');
const queries = require('../queries/userqueries');
const response = require('../response/response');
//Internal Files ------------------------------------


findByCredentials = async (email, password) => {
    const userExist = await pool.query(queries.checkByEmailPass, [email]);
    if (!userExist.rows.length) {
        throw new Error(response.invalidCredentials);
    }
    const user = userExist.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error(response.invalidCredentials);
    }
    const token = user.token;
    delete user.token;
    delete user.password;
    return {user, token};
}

module.exports = findByCredentials;