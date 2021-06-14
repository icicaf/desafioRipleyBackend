const poolDatabase = require('../config/db')
const ErrorResponse = require('../helper/errorResponse')

const getAllByCustomerId = async (req, res, next) => {
    try {
        poolDatabase.query(`SELECT 
                                transfer_id,
                                transfer_nameDestinatary,
                                transfer_rutDestinatary,
                                transfer_bankDestinatary,
                                transfer_typeAccountDestinatary,
                                DATE_FORMAT(created_at, '%d-%m-%Y %H:%i:%s') AS created_at,
                                REPLACE(FORMAT(transfer_totalAmountDestinatary,
                                        'Currency'),
                                    ',',
                                    '.') AS transfer_totalAmountDestinatary,
                                customer_id
                            FROM
                                transfer
                            WHERE customer_id=? 
                            ORDER BY transfer_id DESC`,[
            req.params.id], function(error, results) {
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
        poolDatabase.query("SELECT customer_id FROM  `dbdesafioripley`.`destinatary` WHERE customer_id=? ORDER BY destinatary_id DESC LIMIT 1",[
            req.body.customer_id], function(error, results) {
                if (error) {
                    next(new ErrorResponse("Error",500));
                } else {
                    if(results.length) {
                        poolDatabase.query("INSERT INTO `dbdesafioripley`.`transfer` (`transfer_nameDestinatary`, `transfer_rutDestinatary`, `transfer_bankDestinatary`, `transfer_typeAccountDestinatary`, `transfer_totalAmountDestinatary`, `customer_id`) VALUES (?, ?, ?, ?, ?, ?)",[
                            req.body.transfer_nameDestinatary,
                            req.body.transfer_rutDestinatary,
                            req.body.transfer_bankDestinatary,
                            req.body.transfer_typeAccountDestinatary,
                            req.body.transfer_totalAmountDestinatary,
                            req.body.customer_id], function (error, results, fields) {
                                if (error) {
                                    next(new ErrorResponse("Error",500));
                                } else {
                                    if(results.insertId>0) {
                                        res.status(200).json({"status":200, "transfer":true});
                                    } else {
                                        res.status(200).json({"status":200, "transfer":false});
                                    }
                                }
                            }
                        );
                    } else {
                        res.status(200).json({"status":200, "transfer":false});
                    }
                }
            }
        );
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

module.exports = {
    getAllByCustomerId,
    insert
};
