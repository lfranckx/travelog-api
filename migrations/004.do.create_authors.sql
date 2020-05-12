CREATE TABLE authors (
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    about TEXT,
    profile_image TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT now(),
    date_modified TIMESTAMP
);