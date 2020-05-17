function makeUsersArray() {
    return [
        {
            id: 51,
            username: 'test-user1', 
            password: 'test-user1', 
            email: 'test-user1@gmail.com',
            first_name: "",
            last_name: "",
            profile_image: "",
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 52,
            username: 'test-user2', 
            password: 'test-user2', 
            email: 'test-user2@gmail.com',
            first_name: "",
            last_name: "",
            profile_image: "",
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 53,
            username: 'test-user3', 
            password: 'test-user3', 
            email: 'test-user3@gmail.com',
            first_name: "",
            last_name: "",
            profile_image: "",
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ];
}

function makeArticlesArray(articles) {
    return [
        {
            id: 51,
            title: 'test-article1',
            description: 'this is test description',
            body: 'Im article edison bulb taxidermy jianbing you probably havent heard of them palo santo, next level vegan sriracha. Lumbersexual craft beer fanny pack chicharrones palo santo woke af hammock single-origin coffee raclette intelligentsia semiotics crucifix raw denim freegan. Yr 3 wolf moon tousled hexagon, trust fund vexillologist umami gastropub taxidermy salvia hot chicken snackwave street art ramps semiotics.',
            author: 'full_name',
            username: 'user1',
            image_url: 'http://placehold.it/500x500',
            profile_image: 'http://placehold.it/500x500',
            user_id: users[0].id
        },
        {
            id: 52,
            title: 'test-article2',
            description: 'this is test description',
            body: 'Raw denim ennui edison bulb woke health goth. Austin mustache try-hard gluten-free, flannel squid copper mug. Fashion axe church-key iPhone, selvage slow-carb waistcoat tilde. Celiac blue bottle hell of, before they sold out yr kinfolk knausgaard cornhole helvetica salvia mixtape microdosing hexagon.',
            author: 'full_name',
            username: 'user2',
            image_url: 'http://placehold.it/500x500',
            profile_image: 'http://placehold.it/500x500',
            user_id: users[1].id
        },
        {
            id: 53,
            title: 'test-article3',
            description: 'this is test description',
            body: 'Tousled quinoa whatever letterpress kickstarter 90s. Marfa skateboard cornhole tousled twee slow-carb. Forage cold-pressed asymmetrical pop-up bicycle rights small batch synth. Flannel cronut gentrify pickled, tote bag jianbing pabst fashion axe. Lumbersexual franzen forage helvetica pinterest, typewriter squid.',
            author: 'full_name',
            username: 'user3',
            image_url: 'http://placehold.it/500x500',
            profile_image: 'http://placehold.it/500x500',
            user_id: users[2].id
        },
    ];
}

function makeExpectedArticle(users, article) {
    const user = users.find(
        user => user.id === article.user_id
    );
    return {
        id: article.id,
        title: article.title,
        description: article.description,
        body: article.body,
        author: article.author,
        username: article.username,
        image_url: article.image_url,
        profile_image: article.profile_image,
        date_created: article.date_created,
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            date_created: user.date_created,
        },
    };
}

function makeArticlesFixtures() {
    const testUsers = makeUsersArray();
    const testArticles = makeArticlesArray(testUsers);
    return { testUsers, testArticles };
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE
            articles,
            users,
            comments,
            RESTART IDENTITY CASCADE`
    );
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }));
    return db.into('users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        );
}

function seedArticlesTables(db, users) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('articles').insert(articles)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('articles_id_seq', ?)`,
            [articles[articles.length - 1].id],
        );
    });
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.user_name,
        algorithm: 'HS256',
    });
    return `Bearer ${token}`;
}

module.exports = {
    makeUsersArray,
    makeArticlesArray,
    makeExpectedArticle,
  
    makeArticlesFixtures,
    cleanTables,
    seedArticlesTables,
    makeAuthHeader,
    seedUsers
};  