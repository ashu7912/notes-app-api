const bcrypt = require('bcryptjs');
//External Libraries --------------------------------

const encryptPassword = async (password) => {
    const encryptedPass = await bcrypt.hash(password, 8)
    return encryptedPass;
}

module.exports = encryptPassword;