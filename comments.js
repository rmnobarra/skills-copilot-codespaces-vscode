// create web server with express
const express = require('express');
const router = express.Router(); // create router object
const commentsController = require('../controllers/commentsController');

// GET /comments
router.get('/', commentsController.index);

// GET /comments/new
router.get('/new', commentsController.new);

// POST /comments
router.post('/', commentsController.create);

// GET /comments/:id
router.get('/:id', commentsController.show);

// GET /comments/:id/edit
router.get('/:id/edit', commentsController.edit);

// PUT /comments/:id
router.put('/:id', commentsController.update);

// DELETE /comments/:id
router.delete('/:id', commentsController.delete);

module.exports = router;