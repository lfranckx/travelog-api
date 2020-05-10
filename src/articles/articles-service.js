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
    getByUserId(knex, user_id) {
        return knex
            .select('*')
            .from('articles')
            .where('parent_id', user_id);
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
        return knex('articles')
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
            image_url: xss(articleData.image_url)
        };
    }
};

module.exports = ArticlesService;