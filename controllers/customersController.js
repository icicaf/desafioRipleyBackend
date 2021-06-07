const poolDatabase = require('../config/db')
const ErrorResponse = require('../helper/errorResponse')

const login = async (req, res, next) => {
    try {
        console.log(req.body);
        const data = await poolDatabase.query("SELECT * FROM customer WHERE customer_rut=? and customer_password=?", [
            req.body.customer_rut,
            req.body.customer_password]);
        if(data.length > 0) {
            res.status(200).json({"status":200, "login":true});
        } else {
            res.status(200).json({"status":200, "login":false});
        }
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

const register = async (req, res, next) => {
    try {
        console.log(req.body);
    const data = await poolDatabase.query("INSERT INTO `dbdesafioripley`.`customer` (`customer_rut`, `customer_password`, `customer_name`, `customer_mail`) VALUES (?, ?, ?, ?)",[
        req.body.rut,
        req.body.password,
        req.body.name,
        req.body.email], function( err, results ){
            if(err) {
                res.status(200).json({"status":200, "action":false});
            } else {
                res.status(200).json({"status":200, "action":true});
            }
        });
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

module.exports = {
    login,
    register
};