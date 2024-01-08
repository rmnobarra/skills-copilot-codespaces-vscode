// create web server with express framework
const express = require('express');
// create router object
const router = express.Router();
// import comment model
const Comment = require('../models/comment');
// import passport module
const passport = require('passport');

// create a route for adding comment
router.post('/add-comment', passport.authenticate('jwt', {session: false}), (req, res) => {
    // create new comment object
    const newComment = new Comment({
        // add comment data
        text: req.body.text,
        post: req.body.postId,
        user: req.user.id
    });
    // save comment to database
    newComment.save()
        .then(comment => res.json(comment))
        .catch(err => res.json(err));
});

// create a route for getting comments
router.get('/get-comments/:postId', (req, res) => {
    // find comments by post id
    Comment.find({post: req.params.postId})
        .then(comments => res.json(comments))
        .catch(err => res.json(err));
});

// create a route for deleting comment
router.delete('/delete-comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // find comment by id
    Comment.findById(req.params.id)
        .then(comment => {
            // check if the user is the owner of the comment
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({notauthorized: 'User not authorized'});
            }
            // delete comment
            comment.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.json(err));
});

// export router
module.exports = router;