const jwt = require('jsonwebtoken');
//External Files ------------------------------------

const generateAuthToken = (firstname) => {
    const payload = {
        fistname: firstname,
    };
    const token = jwt.sign(payload, 'thisisnoteapp')
    return token;
}

module.exports = generateAuthToken;