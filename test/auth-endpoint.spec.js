const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const jwt = require('jsonwebtoken')

describe('Auth Endpoints', function() {
  let db
  const { testUsers } = helpers.makeBabiesFixtures()
  const testUser = testUsers[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/auth/login`, () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers,
      )
    )

    const requireFields = ['username', 'password']

    requireFields.forEach(field => {
        const loginAttemptBody = {
            username: testUser.username,
            password: testUser.password,
        }

        it(`responds with a 400 required error when '${field}' is missing`, () => {
            delete loginAttemptBody[field]
            return supertest(app)
                .post('/api/auth/login')
                .send(loginAttemptBody)
                .expect(400, {
                    error: `Missing '${field}' in request body`,
                })
        })

        it ( `responds 400 'invalid username or password' when bad username`, () => {
            const userInvalidUser = { username: 'user-not', password: 'existy' }
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidUser)
                .expect(400, { error: `Incorrect username or password` })
        })
        
        it(`responds 400 'invalid username or password' when bad password`, () => {
            const userInvalidPass = { username: testUser.username, password: 'incorrect'}
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidPass)
                .expect(400, { error: `Incorrect username or password` })
        })

        it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
            const userValidCreds = {
                username: testUser.username,
                password: testUser.password,
            }
            const expectedToken = jwt.sign(
                { user_id: testUser.id }, // payload
                process.env.JWT_SECRET,
                {
                    subject: testUser.username,
                    expiresIn: process.env.JWT_EXPIRY,
                    algorithm: 'HS256',
                }
            )
            return supertest(app)
            .post('/api/auth/login')
            .send(userValidCreds)
            .expect(200, {
                authToken: expectedToken,
            })
        })
    })
  })
  
  describe(`POST /api/auth/refresh`, () => {
    beforeEach('insert users', () => 
      helpers.seedUsers(
        db,
        testUsers,
      )
    )

    it(`responds 200 and JWT auth token using secret`, () => {
      const expectedToken = jwt.sign(
        { user_id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          expiresIn: process.env.JWT_EXPIRY,
          algorithm: 'HS256',
        }
      )
      return supertest(app)
        .post('/api/auth/refresh')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, {
          authToken: expectedToken,
        })
    })
  })
})