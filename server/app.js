const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const http = require('http');

const server = http.createServer(app);
const config = require('config');
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('client'));
app.use(express.static(path.join(__dirname, 'client')));
app.use(cors());
app.options('*', cors());
require('./routes/index')(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


/**
 * Listen on provided port, on all network interfaces.
 */
const port = config.get('serverSettings.port');
server.listen(port, () => console.log(`Example app listening on port ${port}!`));

exports = module.exports = app;


