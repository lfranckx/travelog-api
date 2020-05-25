# Travelog

## Link:
https://travelog-client.now.sh/

## API REPO: 
https://github.com/lfranckx/travelog-api

## API ENDPOINT SERVICES:
### articles: 
Endpoint for storing and accessing all of the data for the articles in the app. It services the app with all of the articles to display for users to read and comment on. It accesses articles associated with the current user logged in to allow that user to create, update, and remove their own articles.

### auth: 
Creates the JSON Web Token to store in the browser, which allows the app to access that user's information and keep them logged in.

### authors: 
Endpoint for retrieving the current user logged in without sending back private information such as the password. This endpoint supplies the app with information such as the profile image for the users and author names.

### comments: 
Endpoint for storing comments being posted on articles. Comments are created with an id, article_id, and unique username for retrieving the data and associating it with articles being posted on.

### upload: 
This uses the multer-s3 package for handling all uploads to the AWS S3 bucket. The S3 bucket stores all of the images that users upload.
The endpoint checks the file type ensuring that it is a JPEG, JPG, PNG, or GIF of no more than 6MB. It then supplies an image url and file name for the API. The API currently only uses the single file upload service.

### users: 
Endpoint for storing and accessing all of the data for each user.  It checks the database for current usernames existing in the database ensuring no duplicate usernames are made. It validates that passwords meet certain parameters such as length and special characters and hashes them using bcryptjs.    

## ENDPOINT DOCUMENTATION:

### AUTH ENDPOINT:
https://still-lake-35765.herokuapp.com/api 
<br>
Method: 'POST'
<br>
Request Body:
<br>
{
<br>&nbsp;&nbsp;&nbsp;&nbsp;"username": "user1",
<br>&nbsp;&nbsp;&nbsp;&nbsp;"user_password": "User1234!"
<br>}
<br>
Response Body:
<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
<br>}<br>

### Articles ENDPOINT - GET by username
https://still-lake-35765.herokuapp.com/api/api/articles/user/:username
<br>
Method: "GET"
<br>
Headers: <br>
&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
&nbsp;&nbsp;&nbsp;&nbsp;<br>}<br>
Response Body:<br>
[<br>
&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,
&nbsp;&nbsp;&nbsp;&nbsp;"title": "Vagabonding",
&nbsp;&nbsp;&nbsp;&nbsp;"description": "Favorite Quotes",
&nbsp;&nbsp;&nbsp;&nbsp;"body": "This is a site for those who have any inclining towards extended travel or independence outside of the ordered world. I created this as a platform for people to share their travel experiences and make connections.",
&nbsp;&nbsp;&nbsp;&nbsp;"author": "Jack Kerouac",
&nbsp;&nbsp;&nbsp;&nbsp;"username": "user1",
&nbsp;&nbsp;&nbsp;&nbsp;"image_url": "https://travelog-files.s3.us-west-1.amazonaws.com/vagabonding-1589815794404",
&nbsp;&nbsp;&nbsp;&nbsp;"profile_image": "https://travelog-files.s3.us-west-1.amazonaws.com/4-1589815387516",
&nbsp;&nbsp;&nbsp;&nbsp;"date": "2020-05-18 00:00:00",
&nbsp;&nbsp;&nbsp;&nbsp;"user_id": 1
&nbsp;&nbsp;&nbsp;&nbsp;<br>}<br>
]<br><br>

## Authors Endpoint - GET by username
https://still-lake-35765.herokuapp.com/api/authors/:chickasuave
<br>
Headers: <br>
{<br>
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
<br>}<br>
Response Body:<br>
[{
<br>"username": "chickasuave",
<br>name: "Nati Sup"
<br>about: "Extraplanetary the only home we've ever known something incredible is waiting to be known great turbulent clouds venture tendrils of gossamer clouds."
<br>profile_image: "",
<br>date_created: "2020-05-18 15:40:43.214477"
<br>}]<br>

## Comments Endpoint - POST
https://still-lake-35765.herokuapp.com/api/comments
Headers: <br>
{<br>
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
<br>}<br>
Response Body:<br>
[{
<br>"id": 2,
<br>"comment": "You have a way with words",
<br>"username": "chickasuave",
<br>"author_name": "Nati Sup",
<br>"profile_image": "https://travelog-files.s3-us-west-1.amazonaws.com/icons/profile.png",
<br>"date": "2020-05-18 15:41:30.884962",
<br>"article_id": "2"
<br>}]<br><br>

## UPLOAD ENDPOINT:
https://still-lake-35765.herokuapp.com/api/upload
<br>
Method: "POST"
<br>
Headers: <br>
{
<br>"Content-Type": "application/json"
<br>"authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
<br>}<br>

Request Body: <br>
{
<br>"image": "beach.png"
<br>
}<br>
Response Body:<br>
{<br>
    "image_name": "beach-1586637059649",
    "image_url": "https://travelog-files.s3.us-west-1.amazonaws.com/beach-1586637059649"
<br>}<br>

USERS ENDPOINT:<br>
https://still-lake-35765.herokuapp.com/api/users
<br>
Method: "POST"
<br>
Headers: 
{<br>
    "Content-Type": "application/json"
<br>}<br>

Body: <br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"email": "testemail@gmail.com",
&nbsp;&nbsp;&nbsp;&nbsp;"username": "TestUser",
&nbsp;&nbsp;&nbsp;&nbsp;"user_password": "Test1234!",
&nbsp;&nbsp;&nbsp;&nbsp;"first_name": "Jack",
&nbsp;&nbsp;&nbsp;&nbsp;"last_name": "K",
<br>}<br>
Response Body: <br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"id": 14,
&nbsp;&nbsp;&nbsp;&nbsp;"username": "TestUser",
&nbsp;&nbsp;&nbsp;&nbsp;"user_password": "$2a$12$vmLS3PwtA2nNRGPQoDWzUeGuHZkiPLDcf1JRKoIhD2ObIDHiIQO5e",
&nbsp;&nbsp;&nbsp;&nbsp;"email": "testemail@gmail.com",
&nbsp;&nbsp;&nbsp;&nbsp;"first_name": "Jack",
&nbsp;&nbsp;&nbsp;&nbsp;"last_name": "K",
&nbsp;&nbsp;&nbsp;&nbsp;"date_created": "2020-04-12T04:01:32.911Z"
<br>}<br>

============================================================

## SUMMARY:
This API allows users to login and create new profiles to sign into.  It uses JWT validation to log users in and access their information from the database using the token.  It communicates with Amazon Web Services S3 Buckets for uploading files and receiving their image url.

## TECHNOLOGIES:
* NodeJS
* Express
* PostgreSQL
* AWS-S3
* Multer/Multer-S3
* JWT
* bcryptjs
* CORS
* Knex
* Treeize
* Winston


<img width="1019" alt="Screen Shot 2020-05-18 at 4 42 04 PM" src="https://user-images.githubusercontent.com/52330544/82269669-34fd2100-9927-11ea-9b26-0186a8d2a138.png">
<img width="1352" alt="Screen Shot 2020-05-18 at 4 42 56 PM" src="https://user-images.githubusercontent.com/52330544/82269677-39293e80-9927-11ea-9e40-670307302b17.png">
<img width="1156" alt="Screen Shot 2020-05-18 at 4 43 25 PM" src="https://user-images.githubusercontent.com/52330544/82269679-3c242f00-9927-11ea-99f2-9d1e59f86325.png">
<img width="1122" alt="Screen Shot 2020-05-18 at 4 45 29 PM" src="https://user-images.githubusercontent.com/52330544/82269681-3d555c00-9927-11ea-8a93-41f8df6be839.png">