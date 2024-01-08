// create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// create express app
const app = express();

// import routes
const commentsRoutes = require('./routes/comments');

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// enable cors
app.use(cors());

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the comments application.' });
});

// use routes
app.use('/comments', commentsRoutes);

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});