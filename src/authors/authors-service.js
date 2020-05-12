const xss = require('xss');
const Treeize = require('treeize');

const AuthorsService = {
    getAllAuthors(knex) {
        return knex.select('*').from('authors');
    },
    getByUsername(knex, username) {
        return knex
            .from('authors')
            .select('*')
            .where('username', username)
            .first();
    },
    insertAuthor(db, newAuthor) {
        return db
            .insert(newAuthor)
                .into('authors')
                .returning('*')
                .then(([author]) => author);
    },
    updateAuthor(knex, username, newAuthorFields) {
        return knex('authors')
            .where({ username })
            .update(newAuthorFields);
    },
    deleteAuthor(knex, username) {
        return knex('authors')
        .where ({ username })
        .delete();
    },
    serializeAuthors(authors) {
        return authors.map(this.serializeAuthor);
    },
    serializeAuthor(author) {
        const authorTree = new Treeize();
        const authorData = authorTree.grow([author]).getData()[0];

        return {
            name: xss(authorData.name),
            about: xss(authorData.about),
            username: xss(authorData.username),
            profile_image: xss(authorData.profile_image),
            user_id: authorData.user_id
        };
    }
};

module.exports = AuthorsService;