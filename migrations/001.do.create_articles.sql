CREATE TABLE articles (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT,
    body TEXT NOT NULL,
    author TEXT NOT NULL,
    username TEXT NOT NULL,
    image_url TEXT,
    profile_image TEXT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    date_modified TIMESTAMP
);