const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({path: './config/config.env'});

// function getBanksService () {
//     try{
//         axios.get(process.env.EXTERNAL_API_URL_LIST_BANK)
//             .then( (response) => {
//                 console.log(response.data);
//                 return  response.data;
//             })
//             .catch(err => res.send(err));
//     }
//     catch(err){
//         console.error("GG", err);
//     }
// }

const getBreeds = async () => {
    try {
        return await axios.get('https://dog.ceo/api/breeds/list/all')
    } catch (error) {
        console.error(error)
    }
}


module.exports = getBreeds;
