const express = require('express');
const path = require('path');
const ArticlesService = require('./articles-service');
const jsonParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

const articlesRouter = express.Router();

articlesRouter
    .route('/')
    .get((req, res, next) => {
        ArticlesService.getAllArticles(req.app.get('db'))
            .then(articles => {
                res.json(ArticlesService.serializeArticles(articles));
            })
            .catch(next);
    })
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { title, description, body, author, username, image_url } = req.body;
        const newArticle = { title, description, body, author, username, image_url };
        newArticle.user_id = req.user.id;

        for (const [key, value] of Object.entries(newArticle))
            if (value == null)
                    return res.status(400).json({
                        error: `Missing ${key} in request body`
                    });
        return ArticlesService.insertArticle(
            req.app.get('db'),
            newArticle
        )
        .then(article => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${article.user_id}`))
                .json(ArticlesService.serializeArticle(article));
        })
        .catch(next);
    });

articlesRouter
    .route('/:article_id')
    .all(checkArticleExists)
    .get((req, res) => {
        res.json(ArticlesService.serializeArticle(res.article));
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const { id, user_id, title, description, body, author, username, image_url } = req.body;
        const articleToUpdate = { id, user_id, title, description, body, author, username, image_url };
        const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length;
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain id, user_id, title, description, body, author, username, or image_url`
                }
            });
        
        ArticlesService.updateArticle(
            req.app.get('db'),
            req.params.id,
            articleToUpdate
        )
        .then(numRowsAffected => {
            res.json(numRowsAffected).status(204).end();
        })
        .catch(next);
    })
    .delete(requireAuth, jsonParser, (req, res, next) => {
        ArticlesService.deleteArticle(
            req.app.get('db'),
            req.params.id
        )
        .then(numRowsAffected => {
            res.status(204).end();
        });
    });

articlesRouter
    .route('/user/id')
    .all(requireAuth)
    .all(checkArticlesExists)
    .get(requireAuth, (req, res) => {
        res.json(ArticlesService.serializeArticles(res.article));
    });

async function checkArticlesExists(req, res, next) {
    try {
        const articles = await ArticlesService.getByUserId(
            req.app.get('db'),
            req.user.id
        );
        if (!articles)
            return res.status(404).json({
                error: `Articles don't exist`
            });

            res.articles = articles;
            next();
    } catch (error) {
        next(error);
    }
}

async function checkArticleExists(req, res, next) {
    try {
        const article = await ArticlesService.getById(
            req.app.get('db'),
            req.params.article_id
        );

        if (!article)
            return res.status(404).json({
                error: `article doesn't exist`
            });

            res.article = article;
            next();
    } catch (error) {
        next(error);
    }
}

module.exports = articlesRouter;