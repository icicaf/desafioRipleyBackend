const dotenv = require('dotenv');
const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const errorHandler = require('./middleware/error')

dotenv.config({path: './config/config.env'});

const transfers = require('./routes/transfersRoute');
const banks = require('./routes/banksRoute');
const customers = require('./routes/customerRoute');
const destinatary = require('./routes/destinataryRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use('/api/transfers', transfers);
app.use('/api/banks', banks);
app.use('/api/customers', customers);
app.use('/api/destinatary', destinatary);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(
      `App listening on port ${PORT} in server ${process.env.NODE_ENV}`
    );
});

process.on('unhandledRejection', (err, promise) => {
    console.log('Error', err.message);
    server.close(() => process.exit(1));
});