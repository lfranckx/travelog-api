const express = require('express');
const path = require('path');
const CommentsService = require('./comments-service');
const { requireAuth } = require('../middleware/jwt-auth');

const commentsRouter = express.Router();
const jsonBodyParser = express.json();

commentsRouter 
    .route('/')
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { comment, username, author_name, article_id, user_id } = req.body;
        const newComment = { comment, username, author_name, article_id, user_id };
        
        for (const [key, value] of Object.entries(newComment))
            if (value == null)
            return res.status(400).json({
                error: `Missing '${key}' in request body`
            });

        newComment.user_id = req.user.id;

        CommentsService.instertComment(
            req.app.get('db'),
            newComment
        )
        .then(comment => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${comment.id}`))
                .json(CommentsService.serializeComment(comment));
        })
        .catch(next);
    });

module.exports = commentsRouter;