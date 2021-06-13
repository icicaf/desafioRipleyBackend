const poolDatabase = require('../config/db')
const ErrorResponse = require('../helper/errorResponse')

const getAllByCustomerId = async (req, res, next) => {
    try {
        poolDatabase.query("SELECT * FROM destinatary WHERE customer_id=?",[
            req.params.id], function(error, results, fields) {
            if (error) {
                next(new ErrorResponse("Error",500));
            } else {
                if(results.length > 0) {
                    res.status(200).json({"status":200, "data": results});
                } else {
                    res.status(200).json({"status":200, "data": {}});
                }
            }
        });
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

const insert = async (req, res, next) => {
    try {
        poolDatabase.query("INSERT INTO `dbdesafioripley`.`destinatary` (`destinatary_rut`, destinatary_name, `destinatary_mail`, `destinatary_telephone`, `destinatary_bank`, `destinatary_typeAccount`, `destinatary_numberAccount`, `customer_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[
            req.body.destinatary_rut,
            req.body.destinatary_name,
            req.body.destinatary_mail,
            req.body.destinatary_telephone,
            req.body.destinatary_bank,
            req.body.destinatary_typeAccount,
            req.body.destinatary_numberAccount,
            req.body.customer_id], function(error, results, fields) {
                if (error) {
                    next(new ErrorResponse("Error",500));
                } else {
                    if(results.insertId > 0) {
                        res.status(200).json({"status":200, "data": {result:true}});
                    } else {
                        res.status(200).json({"status":200, "data": {result:false}});
                    }
                }
            });
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

module.exports = {
    getAllByCustomerId,
    insert
};