const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const poolDatabase = require('../config/db')

const security = async (req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        token = req.headers.authorization.split(' ')[1];
        console.log("existe token");
    }

    if(!token) {
        return next(new ErrorResponse("Error not accesstoken - 1", 401));
        console.log("Error not accesstoken");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const customerDb = await poolDatabase.query("SELECT customer_id, customer_name FROM customer WHERE customer_id=?", [decoded.customer_id]);
        req.customer = customerDb[0].customer_id;
        console.log(req.customer);
        next();

    } catch (error) {
        return next(new ErrorResponse("Error accesstoken invalid - 2", 401));
        console.log("Error accesstoken invalid - 2");
    }
}

module.exports = security;