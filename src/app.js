const express = require('express');
const router = require('./routes');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// middleware global
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api', router);

// error handler (harus paling bawah)
app.use(errorHandler);

module.exports = app;
