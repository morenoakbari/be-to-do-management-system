require('dotenv').config();

// Import Module & Declare Variable
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import DB Connection

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/task');
var userTaskRouter = require('./routes/usertask');

// Create Express App
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

// Gretting route
app.use('/', indexRouter);

// Users API
app.use('/users', usersRouter);

app.use('/task', taskRouter);

app.use('/userTask', userTaskRouter);

// Handle Error
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set port
const port = process.env.APP_PORT || 4000;

// check env
const env = process.env.ENV_TYPE || 'production';

if (env === 'development') {
  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


module.exports = app;