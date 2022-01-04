const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000, moviesData = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

mongoose.connect(moviesData);

app.use(router);

app.listen(PORT);
