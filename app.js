const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRoutes = require('./routes/tourRoutes')
const userRoutes = require('./routes/userRoutes')

// Middleware
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}


app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {

  next();
});
app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRoutes)
app.use('/api/v1/users', userRoutes)

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});



module.exports = app;












