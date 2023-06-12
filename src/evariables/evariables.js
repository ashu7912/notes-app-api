const user = process.env.USER_NAME;
const db_host = process.env.DB_HOST;
const database = process.env.DB;
const password = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT;
const port = process.env.PORT;
const jwt_secret = process.env.SECRET_KEY;


module.exports = {
    user,
    db_host,
    database,
    password,
    db_port,
    port,
    jwt_secret
}