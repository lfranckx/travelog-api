const xss = require('xss');
const Treeize = require('treeize');

const ArticlesService = {
    getAllArticles(knex) {
        return knex.select('*').from('articles');
    },
    getById(knex, id) {
        return knex
            .from('articles')
            .select('*')
            .where('id', id)
            .first();
    },
    getByUsername(knex, username) {
        return knex
            .select('*')
            .from('articles')
            .where('username', username);
    },
    getCommentsForArticle(knex, article_id) {
        return knex
            .select('*')
            .from('comments')
            .where('article_id', article_id)
    },
    insertArticle(db, newArticle) {
        return db
            .insert(newArticle)
                .into('articles')
                .returning('*')
                .then(([article]) => article);
    },
    updateArticle(knex, id, newArticleFields) {
        return knex('articles')
            .where({ id })
            .update(newArticleFields);
    },
    deleteArticle(knex, id) {
        return knex
        .from('articles')
        .where ({ id })
        .delete();
    },
    serializeArticles(articles) {
        return articles.map(this.serializeArticle);
    },
    serializeArticle(article) {
        const articleTree = new Treeize();
        const articleData = articleTree.grow([article]).getData()[0];

        return {
            id: articleData.id,
            user_id: articleData.user_id,
            title: xss(articleData.title),
            description: xss(articleData.description),
            body: xss(articleData.body),
            author: xss(articleData.author),
            date: xss(articleData.date),
            username: xss(articleData.username),
            image_url: xss(articleData.image_url),
            profile_image: xss(articleData.profile_image)
        };
    },
    serializeArticleComments(comments) {
        return comments.map(this.serializeArticleComment);
    },
    serializeArticleComment(comment) {
        const commentTree = new Treeize();
        const commentData = commentTree.grow([ comment ]).getData()[0]

        return {
            id: commentData.id,
            comment: xss(commentData.comment),
            username: xss(commentData.username),
            author_name: xss(commentData.author_name),
            article_id: commentData.article_id,
            date: commentData.date,
            user: commentData.user || {}
        }
    },
};

module.exports = ArticlesService;