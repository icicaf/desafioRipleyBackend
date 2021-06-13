const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({path: './config/config.env'});

const getBanks = async () => {
    try {
        return await axios.get(process.env.EXTERNAL_API_URL_LIST_BANK)
    } catch (error) {
        console.error(error)
    }
}

module.exports = getBanks;