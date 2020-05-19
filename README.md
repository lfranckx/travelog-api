NAME OF APP: Toddler

LINK TO LIVE APP: https://travelog-client.now.sh/

API REPO: https://github.com/lfranckx/travelog-api

DEMO USER: 
    Username: Demo 
    Password: Demo1234!

============================================================

API ENDPOINT SERVICES:

articles: Endpoint for storing and accessing all of the data for the articles in the app. It services the app with all of the articles to display for users to read and comment on. It accesses articles associated with the current user logged in to allow that user to create, update, and remove their own articles.

auth: Creates the JSON Web Token to store in the browser, which allows the app to access that user's information and keep them logged in.

authors: Endpoint for retrieving the current user logged in without sending back private information such as the password. This endpoint supplies the app with information such as the profile image for the users and author names.

comments: Endpoint for storing comments being posted on articles. Comments are created with an id, article_id, and unique username for retrieving the data and associating it with articles being posted on.

upload: This uses the multer-s3 package for handling all uploads to the AWS S3 bucket. The S3 bucket stores all of the images that users upload.
The endpoint checks the file type ensuring that it is a JPEG, JPG, PNG, or GIF of no more than 6MB. It then supplies an image url and file name for the API. The API currently only uses the single file upload service.

users: Endpoint for storing and accessing all of the data for each user.  It checks the database for current usernames existing in the database ensuring no duplicate usernames are made. It validates that passwords meet certain parameters such as length and special characters and hashes them using bcryptjs.    

============================================================

ENDPOINT DOCUMENTATION:

AUTH ENDPOINT:

https://still-lake-35765.herokuapp.com/api

Method: 'POST'

Request Body:
{
	"username": "user1",
	"user_password": "User1234!"
}

Response Body:
{
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}

Articles ENDPOINT - GET by username

https://still-lake-35765.herokuapp.com/api/api/articles/user/:username

Method: "GET"

Headers: {
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}
Response Body:
[
    {
        'id': 1,
        'title': 'Vagabonding',
        'description': 'Favorite Quotes',
        'body': 'This is a site for those who have any inclining towards extended travel or independence outside of the ordered world. I created this as a platform for people to share their travel experiences and make connections.',
        'author': 'Jack Kerouac',
        'username': 'user1',
        'image_url': 'https://travelog-files.s3.us-west-1.amazonaws.com/vagabonding-1589815794404',
        'profile_image': 'https://travelog-files.s3.us-west-1.amazonaws.com/4-1589815387516',
        'date': '2020-05-18 00:00:00',
        'user_id': 1
    }
]

Authors Endpoint - GET by username
https://still-lake-35765.herokuapp.com/api/authors/:chickasuave
Headers: {
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}
Response Body:
[
    {
        "username": "chickasuave",
        name: "Nati Sup"
        about: "Extraplanetary the only home we've ever known something incredible is waiting to be known great turbulent clouds venture tendrils of gossamer clouds."
        profile_image: "",
        date_created: "2020-05-18 15:40:43.214477"
    }
]

Comments Endpoint - POST
https://still-lake-35765.herokuapp.com/api/comments
Headers: {
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}
Response Body:
[
    {
        "id": 2,
        "comment": "You have a way with words",
        "username": "chickasuave",
        "author_name": "Nati Sup",
        "profile_image": "https://travelog-files.s3-us-west-1.amazonaws.com/icons/profile.png",
        "date": "2020-05-18 15:41:30.884962",
        "article_id": "2"
    }
]

UPLOAD ENDPOINT:
https://warm-anchorage-60574.herokuapp.com/api/upload

Method: "POST"

Headers: {
    "Content-Type": "application/json"
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}

Request Body: {
    "image": "beach.png"
}
Response Body:
{
    "image_name": "beach-1586637059649",
    "image_url": "https://travelog-files.s3.us-west-1.amazonaws.com/beach-1586637059649"
}

USERS ENDPOINT:
https://warm-anchorage-60574.herokuapp.com/api/users

Method: "POST"

Headers: {
    "Content-Type": "application/json"
}

Body: {
    "email": "testemail@gmail.com",
    "username": "TestUser",
    "user_password": "Test1234!",
    "first_name": "Jack",
    "last_name": "K",
}
Response Body: {
    "id": 14,
    "username": "TestUser",
    "user_password": "$2a$12$vmLS3PwtA2nNRGPQoDWzUeGuHZkiPLDcf1JRKoIhD2ObIDHiIQO5e",
    "email": "testemail@gmail.com",
    "first_name": "Jack",
    "last_name": "K",
    "date_created": "2020-04-12T04:01:32.911Z"
}

============================================================

SUMMARY:
This API allows users to login and create new profiles to sign into.  It uses JWT validation to log users in and access their information from the database using the token.  It communicates with Amazon Web Services S3 Buckets for uploading files and receiving their image url.

TECHNOLOGIES USED:
AWS-SDK
Bcryptjs
CORS
Express
JWT
Knex
Multer-S3
Treeize
Winston


<img width="1019" alt="Screen Shot 2020-05-18 at 4 42 04 PM" src="https://user-images.githubusercontent.com/52330544/82269669-34fd2100-9927-11ea-9b26-0186a8d2a138.png">
<img width="1352" alt="Screen Shot 2020-05-18 at 4 42 56 PM" src="https://user-images.githubusercontent.com/52330544/82269677-39293e80-9927-11ea-9e40-670307302b17.png">
<img width="1156" alt="Screen Shot 2020-05-18 at 4 43 25 PM" src="https://user-images.githubusercontent.com/52330544/82269679-3c242f00-9927-11ea-99f2-9d1e59f86325.png">
<img width="1122" alt="Screen Shot 2020-05-18 at 4 45 29 PM" src="https://user-images.githubusercontent.com/52330544/82269681-3d555c00-9927-11ea-8a93-41f8df6be839.png">