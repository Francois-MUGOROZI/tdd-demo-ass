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

app.use('/', (req, res) => {
  res.send('Welcome to contact book');
});

app.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND ',
  }),
);

module.exports.app = app;
 