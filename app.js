var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var { check , validationResults } = require('express-validator'); // validate
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var loginRouter = require('./routes/login');
var categoryRouter = require('./routes/category');
var chitietsanphamRouter = require('./routes/chitietsanpham');
var adminRouter = require('./routes/admin');
var registerRouter = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // Hàm trung gian (midleware)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ // Session login
  secret : 'secret',
  resave : true,
  saveUninitialized : true
}));


app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.use('/category', categoryRouter);
app.use('/chitietsanpham', chitietsanphamRouter);
app.use('/admin',adminRouter);
app.use('/register',registerRouter);

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
