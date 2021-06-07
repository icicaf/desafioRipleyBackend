const poolDatabase = require('../config/db')
const ErrorResponse = require('../helper/ErrorResponse')

const getAll = async (req, res, next) => {
    try {
        const data = await poolDatabase.query("SELECT * FROM destinatary");
        res.status(200).json(data);
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

const insert = async (req, res, next) => {
    try {
        const data = await poolDatabase.query("INSERT INTO `dbdesafioripley`.`destinatary` (`destinatary_rut`, destinatary_name, `destinatary_mail`, `destinatary_telephone`, `destinatary_bank`, `destinatary_typeAccount`, `destinatary_numberAccount`) VALUES (?, ?, ?, ?, ?, ?, ?)",[
            (req.body.destinatary_rut),
            (req.body.destinatary_name),
            (req.body.destinatary_mail),
            (req.body.destinatary_telephone),
            (req.body.destinatary_bank),
            (req.body.destinatary_typeAccount),
            (req.body.destinatary_numberAccount)]);

            res.status(200).json({status:200,action:true});
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

module.exports = {
    getAll,
    insert
};