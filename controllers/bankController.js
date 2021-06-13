const dotenv = require('dotenv');
const axios = require('axios');
const ErrorResponse = require('../helper/errorResponse')

dotenv.config({path: './config/config.env'});

const getAll = async (req, res, next) => {
    try{
        axios.get(process.env.EXTERNAL_API_URL_LIST_BANK)
            .then( (response) => {
                res.status(200).json(response.data.banks);
            })
            .catch(err => res.send(err)
        );
    }
    catch(error){
        next(new ErrorResponse('Error',500));
    }
}

module.exports = {
    getAll
};