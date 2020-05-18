const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Authors Endpoints', function() {
    let db;
  
    const { testAuthors } = helpers.makeAuthorsFixtures();
    const testAuthor = testAuthors[0];
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());

    before('cleanup', () => helpers.cleanTables(db));

    afterEach('cleanup', () => helpers.cleanTables(db));

    describe(`POST /api/authors`, () => {
        context(`User Validation`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(
                    db,
                    testUsers
                )
            );

            const requiredFields = ['username', 'name', 'about', 'profile_image'];
            requiredFields.forEach(field => {
                it(`responds 400 'Username already taken' when username isn't unique`, () => {
                    const duplicateAuthor = {
                        username: testAuthor.username,
                        name: testAuthor.name,
                        about: testAuthor.about,
                        profile_image: testAuthor.profile_image
                    };
                    return supertest(app)
                        .post('/api/users')
                        .send(duplicateAuthor)
                        .expect(400, { error: `Username already taken` });
                });

            });
        });

        context(`Happy path`, () => {
            it(`responds 201, serialized user`, () => {
                const newAuthor = {
                    username: testAuthor.username,
                    name: testAuthor.name,
                    about: testAuthor.about,
                    profile_image: testAuthor.profile_image
                };
                return supertest(app)
                    .post('/api/users')
                    .send(newAuthor)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('id');
                        expect(res.body.username).to.eql(newAuthor.username);
                        expect(res.body.name).to.eql(newAuthor.name);
                        expect(res.body.about).to.eql(newAuthor.about);
                        expect(res.body.profile_image).to.eql(newAuthor.profile_image);
                        expect(res.headers.location).to.eql(`/api/authors/${res.body.id}`);
                        const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' });
                        const actualDate = new Date(res.body.date_created).toLocaleString();
                        expect(actualDate).to.eql(expectedDate);
                    })
                    .expect(res => 
                        db
                            .from('authors')
                            .select('*')
                            .where({ id: res.body.id })
                            .first()
                            .then(row => {
                                expect(row.username).to.eql(newAuthor.username);
                                const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' });
                                const actualDate = new Date(row.date_created).toLocaleString();
                                expect(actualDate).to.eql(expectedDate);
                            })    
                            .then(compareMatch => {
                                expect(compareMatch).to.be.true
                            })
                    );
            });
        });
    });
});