const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");

const security = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        console.log(req.headers.authorization)
        token = req.headers.authorization.split(' ')[1];
       
    }

    if(!token){
        return next(new ErrorResponse("Error not accesstoken - 1",401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('token', decoded);
        next();

    } catch (error) {
        return next(new ErrorResponse("Error accesstoken invalid - 2",401));
    }
}

module.exports = security;