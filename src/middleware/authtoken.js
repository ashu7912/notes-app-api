const jwt = require('jsonwebtoken');
const evariables = require('../evariables/evariables');
//External Files ------------------------------------

const generateAuthToken = (firstname) => {
    const payload = {
        fistname: firstname,
    };
    const token = jwt.sign(payload, evariables.jwt_secret);
    return token;
}

module.exports = generateAuthToken;