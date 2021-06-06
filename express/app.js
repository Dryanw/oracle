const url = require('url');
const cors = require('cors');
const axios = require('axios');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/quote',  cors(), function(req, res){
    let params = new URLSearchParams(url.parse(req.url).query);
    let symbol = params.get('symbol');
    console.log(`GET /quote: symbol=${symbol}`);
    try{
        axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=7B9DIHHTAFDTBOGL`).then(
            resp => {
                res.json({success: 1,
                          data:{price: resp.data['Global Quote']['05. price'], volume: resp.data['Global Quote']['06. volume']}});
            });
    } catch(err) {
        console.log(err.message);
        res.json({success: 0});
    };
});

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
