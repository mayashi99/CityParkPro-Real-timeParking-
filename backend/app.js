const cors = require("cors");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
const bookingRouter = require('./routes/booking'); 
const slotRouter = require('./routes/slot');

// Import seedDatabase function
//const seedDatabase = require('./seedData');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect('mongodb+srv://mayashikodikara:12345@cluster0.55qrg.mongodb.net/test')

  .then(() => console.log('Connected!'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/api', bookingRouter); // Mount bookingRouter at /api
app.use('/api', slotRouter); // Mount slotRouter at /api


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
