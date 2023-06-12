const Pool = require('pg').Pool;
//External Libraries --------------------------------
const evariables = require('../evariables/evariables');

const pool = new Pool({
    user: evariables.user,
    host: evariables.db_host,
    database: evariables.database,
    password: evariables.password,
    port: evariables.db_port
})
process.env.MONGODB_URL


module.exports = pool;