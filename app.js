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
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Set up mongoose connection

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://mansursaad_db_user:lNQwjNoLnD8W3Skd@analytics.oyapxcl.mongodb.net/?appName=AnalyticsDB&retryWrites=true&w=majority";

 

main().catch((err) => console.log(err));

async function main() {

  await mongoose.connect(mongoDB);

}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// ...existing code...
const cors = require('cors');
const bcrypt = require('bcrypt');


// during development allow your frontend origin (or use app.use(cors()) temporarily)
app.use(cors({ origin: 'http://localhost:3000' }));
app.options('*', cors());
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const bcrypt = require('bcrypt');
    const hash = await bcrypt.hash(password, 10);

    // TODO: save user to DB
    console.log('Signup:', { name, email });
    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err);
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json({ error: 'Internal server error', detail: err.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// global error handler (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;