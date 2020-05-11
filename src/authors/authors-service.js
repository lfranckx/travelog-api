const xss = require('xss');
const Treeize = require('treeize');

const AuthorsService = {
    getAllAuthors(knex) {
        return knex.select('*').from('authors');
    },
    getById(knex, id) {
        return knex
            .from('authors')
            .select('*')
            .where('author_id', id)
            .first();
    },
    insertAuthor(db, newAuthor) {
        return db
            .insert(newAuthor)
                .into('authors')
                .returning('*')
                .then(([author]) => author);
    },
    updateAuthor(knex, id, newAuthorFields) {
        return knex('authors')
            .where({ id })
            .update(newAuthorFields);
    },
    deleteAuthor(knex, id) {
        return knex('authors')
        .where ({ id })
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
            profile_image: xss(authorData.profile_image),
            author_id: authorData.author_id
        };
    }
};

module.exports = AuthorsService;