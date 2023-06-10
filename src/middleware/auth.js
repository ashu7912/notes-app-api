const jwt = require('jsonwebtoken');
const pool = require('../postgres/db');
//External Libraries --------------------------------

const queries = require('../queries/userqueries');
const response = require('../response/response');
//Internal Files ------------------------------------


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader =  req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: response.authHeaderMissing });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: response.tokenNotFound });
    }

    // Query the database to check if the token is valid
    const decoded = jwt.verify(token, 'thisisnoteapp');
    
    const userExist = await pool.query(queries.getUserByToken, [token]);
    if (!userExist.rows.length) {
        return res.status(401).json({ message: response.unAuthorisedUser});
    }
    const user = userExist.rows[0];
    delete user.token;
    delete user.password;
    req.user = user

    // Continue to the next middleware or route
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authMiddleware;