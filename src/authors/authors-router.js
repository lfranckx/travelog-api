const express = require('express');
const path = require('path');
const AuthorsService = require('./authors-service');
const jsonParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

const authorsRouter = express.Router();

authorsRouter
    .route('/')
    .get((req, res, next) => {
        AuthorsService.getAllAuthors(req.app.get('db'))
            .then(authors => {
                res.json(AuthorsService.serializeAuthors(authors));
            })
            .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        const { username, name, about, profile_image } = req.body;
        const newAuthor = { username, name, about, profile_image };

        for (const [key, value] of Object.entries(newAuthor))
            if (value == null)
                    return res.status(400).json({
                        error: `Missing ${key} in request body`
                    });
        return AuthorsService.insertAuthor(
            req.app.get('db'),
            newAuthor
        )
        .then(author => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${author.user_id}`))
                .json(AuthorsService.serializeAuthor(author));
        })
        .catch(next);
    });

authorsRouter
    .route('/user/loggedin')
    .all(requireAuth)
    .get((req, res, next) => {        
        AuthorsService.getByUsername(
            req.app.get('db'),
            req.user.username
        )
        .then(author => {
            res.json(AuthorsService.serializeAuthor(author));
        })
        .catch(next);
    });

authorsRouter
    .route('/:username')
    .all(checkAuthorExists)
    .get((req, res) => {
        res.json(AuthorsService.serializeAuthor(res.author));
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const { username, name, about, profile_image } = req.body;
        const authorToUpdate = { username, name, about, profile_image };
        const numberOfValues = Object.values(authorToUpdate).filter(Boolean).length;
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain username, name, about, or profile_image`
                }
            });

        AuthorsService.updateAuthor(
            req.app.get('db'),
            req.body.username,
            authorToUpdate
        )
        .then(numOfRowsAffected => {
            res.json(numOfRowsAffected).status(204).end();
        })
        .catch(next);
    })
    .delete(requireAuth, jsonParser, (req, res, next) => {
        AuthorsService.deleteAuthor(
            req.app.get('db'),
            req.body.username
        )
        .then(numOfRowsAffected => {
            res.status(204).end();
        });
    });

async function checkAuthorExists(req, res, next) {
    try {
        const author = await AuthorsService.getByUsername(
            req.app.get('db'),
            req.params.username
        );
        if (!author)
            return res.status(404).json({
                error: `Author doesn't exist`
            });

            res.author = author;
            next();
    } catch (error) {
        next(error);
    }
}

module.exports = authorsRouter;