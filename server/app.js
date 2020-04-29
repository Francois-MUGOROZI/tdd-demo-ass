const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Welcome to contact book' });
});

app.get('/api/notfound', (req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND ',
  }),
);

module.exports.app = app;
