var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var procesosRouter = require('./routes/procesos');
var tMtosRouter = require('./routes/tiposDeMtos');
var tEstadosRouter = require('./routes/tiposDeEstados');
var mtosRouter = require('./routes/mtos');
var cobrosRouter = require('./routes/cobros');
var miembrosRouter = require('./routes/miembros');
var resumenesRouter = require('./routes/resumenes');
var procEstM2mRouter = require('./routes/procEstM2m');
var gastosRouter = require('./routes/gastos');
var pagosRouter = require('./routes/pagos');
var cajaRouter = require('./routes/caja');
var ojudsRouter = require('./routes/ojuds');
const authRoutes = require('./routes/auth');

const cors = require('cors');

var app = express();

//view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', procesosRouter);
app.use('/users', usersRouter);
app.use('/procesos', procesosRouter);
app.use('/tMtos', tMtosRouter);
app.use('/tEstado', tEstadosRouter);
app.use('/procEstM2m', procEstM2mRouter);
app.use('/mtos', mtosRouter);
app.use('/cobros', cobrosRouter); 
app.use('/miembros', miembrosRouter);
app.use('/resumenes', resumenesRouter);
app.use('/gastos', gastosRouter);
app.use('/pagos', pagosRouter); 
app.use('/caja', cajaRouter); 
app.use('/auth', authRoutes);
app.use('/ojuds', ojudsRouter);


//Serve React Frontend
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  console.log('Serving index.html for', req.url);
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


module.exports = app;