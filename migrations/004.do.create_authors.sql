CREATE TABLE authors (
    name TEXT NOT NULL,
    about TEXT,
    profile_image TEXT REFERENCES users(profile_image),
    date_created TIMESTAMP NOT NULL DEFAULT now(),
    date_modified TIMESTAMP
);