const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const poolDatabase = require('../config/db')

const security = async (req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new ErrorResponse("Error not accesstoken - 1", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const customerDb = await poolDatabase.query("SELECT customer_id FROM customer WHERE customer_id=?", [decoded.customer_id]);
        req.customer = customerDb[0].customer_id;
        next();

    } catch (error) {
        return next(new ErrorResponse("Error accesstoken invalid - 2", 401));
    }
}

module.exports = security;