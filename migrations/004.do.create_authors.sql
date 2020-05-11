CREATE TABLE authors (
    name TEXT NOT NULL,
    about TEXT,
    username TEXT NOT NULL,
    profile_image TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT now(),
    date_modified TIMESTAMP,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);