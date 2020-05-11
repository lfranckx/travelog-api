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
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { name, about, profile_image } = req.body;
        const newAuthor = { name, about, profile_image };
        newAuthor.user_id = req.user.id;

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
    .route('/:author_id')
    .all(checkAuthorExists)
    .get((req, res) => {
        res.json(AuthorsService.serializeAuthor(res.author));
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const { name, about, profile_image, author_id } = req.body;
        const authorToUpdate = { name, about, profile_image, author_id };
        const numberOfValues = Object.values(authorToUpdate).filter(Boolean).length;
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain name, about, profile_image, or author_id`
                }
            });

        AuthorsService.updateAuthor(
            req.app.get('db'),
            req.params.author_id,
            authorToUpdate
        )
        .then(numOfRowsAffected => {
            res.json(numRowsAffected).status(204).end();
        })
        .catch(next);
    })
    .delete(requireAuth, jsonParser, (req, res, next) => {
        AuthorsService.deleteAuthor(
            req.app.get('db'),
            req.params.author_id
        )
        .then(numRowsAffected => {
            res.status(204).end();
        });
    });

async function checkAuthorExists(req, res, next) {
    try {
        const author = await AuthorsService.getById(
            req.app.get('db'),
            req.params.author_id
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