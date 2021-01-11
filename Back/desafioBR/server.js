const dotevn = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDataBase = require('./config/db');
const errorHandler = require('./middleware/error');

dotevn.config({ path: './config/config.env' });
connectDataBase();

const user = require('./routes/usersRoute');
const product = require('./routes/productsRoute');
const transfer = require('./routes/transfersRoute');

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/movements', transfer);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} in server ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection', (error, promise) => {
  console.log('ERROR =', error.message);
  server.close(() => process.exit(1));
});
