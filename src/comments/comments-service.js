const xss = require('xss');

const CommentsService = {
    getById(knex, id) {
        return knex
            .from('comments')
            .select('*')
            .where('id', id)
            .first();
    },
    insertComment(db, newComment) {
        return db
            .insert(newComment)
            .into('comments')
            .returning('*')
            .then(([comment]) => comment);
    },
    serializeComment(comment) {
        return {
            id: comment.id,
            comment: xss(comment.comment),
            username: xss(comment.username),
            author_name: xss(comment.author_name),
            article_id: comment.article_id,
            date: comment.date
        };
    }
};

module.exports = CommentsService;