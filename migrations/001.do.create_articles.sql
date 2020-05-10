CREATE TABLE articles (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT,
    body TEXT NOT NULL,
    author TEXT NOT NULL,
    date TIMESTAMP DEFAULT now() NOT NULL,
    username TEXT NOT NULL UNIQUE,
    image_url TEXT
);