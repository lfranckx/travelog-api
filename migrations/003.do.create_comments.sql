CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE
        REFERENCES users(username) ON DELETE CASCADE NOT NULL,
    author_name TEXT NOT NULL,
    date TIMESTAMP DEFAULT now() NOT NULL,
    article_id INTEGER
        REFERENCES articles(id) ON DELETE CASCADE NOT NULL
);