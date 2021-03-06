const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { signup, signin } = require('./controller/authController');
const { authorize } = require('./middlewares/authorization');
const {
  createContact,
  getContacts,
  getContact,
  deleteContact,
} = require('./controller/contactController');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Welcome to contact book' });
});

app.post('/auth/signup', signup);
app.post('/auth/signin', signin);
app.post('/contacts', authorize, createContact);
app.get('/contacts', authorize, getContacts);
app.get('/contacts/:id', authorize, getContact);
app.delete('/contacts/:id', authorize, deleteContact);

app.get('/api/notfound', (req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND ',
  }),
);

module.exports.app = app;
