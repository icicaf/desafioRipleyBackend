const poolDatabase = require('../config/db')
const ErrorResponse = require('../helper/ErrorResponse')

const getAll = async (req, res, next) => {
    try {
        const data = await poolDatabase.query("SELECT * FROM transfer");
        res.status(200).json(data);
        console.log(data);
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}
  
module.exports = {
    getAll
};