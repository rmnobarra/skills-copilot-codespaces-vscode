// create web server with express
const express = require('express');
const app = express();
// import body-parser
const bodyParser = require('body-parser');
// import mongoose
const mongoose = require('mongoose');
// import comment model
const Comment = require('./models/comment');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/commentDB', { useNewUrlParser: true });

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// set up port
const port = process.env.PORT || 3000;

// create a route
app.get('/', (req, res) => {
    res.send('Welcome to comments app');
});

// create a route for getting all comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(comments);
        }
    });
});

// create a route for getting a comment by id
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(comment);
        }
    });
});

// create a route for posting a new comment
app.post('/comments', (req, res) => {
    let comment = new Comment({