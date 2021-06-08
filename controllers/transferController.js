const poolDatabase = require('../config/db')
const ErrorResponse = require('../helper/errorResponse')

const getAllByCustomerId = async (req, res, next) => {
    try {
        poolDatabase.query("SELECT * FROM transfer WHERE customer_id=?",[
            req.params.id], function(error, results, fields) {
            if (error) {
                next(new ErrorResponse("Error",500));
                console.log(error);
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
        poolDatabase.query("INSERT INTO `dbdesafioripley`.`transfer` (`transfer_nameDestinatary`, `transfer_rutDestinatary`, `transfer_bankDestinatary`, `transfer_typeAccountDestinatary`, `transfer_totalAmountDestinatary`, `customer_id`) VALUES (?, ?, ?, ?, ?, ?)",[
            req.body.transfer_nameDestinatary,
            req.body.transfer_rutDestinatary,
            req.body.transfer_bankDestinatary,
            req.body.transfer_typeAccountDestinatary,
            req.body.transfer_totalAmountDestinatary,
            req.body.customer_id], function (error, results, fields) {
                if (error) {
                    next(new ErrorResponse("Error",500));
                    console.log(error);
                } else {
                    console.log(results);
                    if(results.insertId) {
                        res.status(200).json({"status":200, "transfer":true});
                    } else {
                        res.status(200).json({"status":200, "transfer":false});
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