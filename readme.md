# Per Scholas SBA 318 Express Server Application

I MADE MY VERY OWN FIRST API!!! 🎉🎉 I really enjoyed this assignment. 

### Introduction
Project Support is an open source platform that enable users share causes they're passionate about and actively involved with with the hopes of connecting with other users equally interested in working with them on the given cause.
### API Features
* Users can signup and view their account details in the Root database. 
* Admins/Authenticated Users have access the login database, that includes sensitive information. 
* View your posting history and alter its contents.
* This API follows RESTful practices, including invoking CRUD operations.

### Overview Directory
    .
    ├── data                    # Data Categories (users, logins, posts)
    │   ├── users
    │   ├── logins 
    │   └── posts            
    ├── middleware              # Middleware (custom)
    │   ├── fetchSalt             # fetches a random salt from an api
    │   ├── hashPassword          # hashing my password into sha256
    │   └── userCreated           # add flags onto users created through form submissions for later logic
    ├── routes                  # routes (users, logins, posts)
    │   ├── users
    │   ├── logins              
    │   └── posts
    ├── styles                  # styles
    │   └── posts
    ├── views                   # view templates (ejs)
    │   ├── logins                # view user and login data (admin)
    │   └── newUserForm           # new user form, sends post request to /users
    ├── .gitignore
    ├── index
    ├── package-lock.json
    ├── package.json
    └── readme.md

**For logins.js, it is supposed to be locked under an admin key but according to the rubric, this should be avoided for testing convenience.**

### Requirements/Tracking
| Requirement | Weight | Finished |
| :-- | :--: | :--: |
| Create and use at least two pieces of custom middleware. | 5% | ✅ |
| Create and use error-handling middleware | 5% | ✅ |
| Use at least three different data categories (e.g., users, posts, or comments). | 5% | ✅ |
| Utilize reasonable data structuring practices. | 5% | ✅ |
| Create GET routes for all data that should be exposed to the client. | 5% | ✅ |
| Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request. | 5% | ✅ |
| Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request. | 5% | ✅ |
| Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request. | 5% | ✅ |
| Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters. <br><br> Note: DO NOT use API keys; this makes it more difficult for instructors to grade finished projects efficiently. | 5% | ✅ |
| Utilize route parameters, where appropriate. | 5% | ✅ |
| Adhere to the guiding principles of REST. | 10% | ✅ |
| Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine. <br><br> If you are stuck on how to approach this, think about ways you could render the current state of your API's data for easy viewing. | 8% | ✅ |
| Use simple CSS to style the rendered views. <br><br> Note: This is not a test of design; it is a test of serving static files using Express. The CSS can be very simple. | 2% | ✅ |
| Include a form within a rendered view that allows for interaction with your RESTful API. | 3% | ✅ |
| Utilize reasonable code organization practices. | 5% | ✅ |
| Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). | 10% | ✅ |
| Commit frequently to the git repository. | 5% | ✅ |
| Include a README file that contains a description of your application. | 2% | ✅ |
| Level of effort displayed in creativity, presentation, and user experience. | 5% | ✅ |

### Testing
For my tester, when using POST requests for <code>/users /posts</code>, feel free to copy and paste these sample bodies for your convenience:  
<pre>{
  "name": {
    "first": "Tester",
    "last": "Learner",
    "display": "Per Scholas"
  },
  "email": "ps@example.com",
  "username": "perscholas123",
  "password": "12345"
}
</pre>
<pre>
{
    "id": 1,
    "userId": 3,
    "title": "What do you think about Root's UX? ",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin eu libero vitae varius. Fusce ut orci vulputate, suscipit libero sed."
}
</pre>

### API Endpoints

#### Default
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | / | Get a welcome message to the Root API |
| GET | /new | Create a new user through a user sign up form |

#### Users
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /users | Retrieve all users |
| GET | /users?id= | Retrieve user based on id |
| GET | /users?display= | Retrieve user based on display name |
| GET | /users?email = | Retrieve user based on email |
| GET | /users/:id | Retrieve user based on id |
| POST | /users | Creates a new user and the login information |
| PATCH | /users?id= | Updates a users information based on id |
| PATCH | /users:id | Updates a users information based on id |
| DELETE | /users | Deletes the users very own information, assuming this user created their profile through the sign up page from newUserForm.ejs
| DELETE | /users:id | Deletes a users information based on id |

#### Logins (Accessible by Admins)
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /logins/view | Renders a list of user information |
| GET | /logins | Retrieve a list of login information of users |
| GET | /logins/:id | Retrieve a user's login information based on id |
| PATCH | /logins?id= | Update user's login information based on id |
| PATCH | /logins?sha256= | Update user's login information based on sha256 |
| PATCH | /logins/id | Update user's login information based on id |
| PATCH | /logins/sha256 | Update user's login information based on sha256 | 
| DELETE | /logins?id= | Delete user information based on the id |
| DELETE | /logins?sha256= | Delete user information based on the sha256 | 
| DELETE | /logins/id | Delete user information based on the id |
| DELETE | /logins/sha256 | Delete user information based on the sha256 | 


#### Posts
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /posts?userId= | Retrieve posts based on userId |
| GET | /posts?title= | Retrieve posts based on title |
| GET | /posts?content= | Retrieve posts based on content |
| GET | /posts/:userId | Retrieve posts based on userId |
| GET | /posts/:userId/:title | Retrieve posts based on userId and title |
| GET | /posts/:userId/:postId | Retrieve posts based on userId and postId
| POST | /posts | Creates a new post |
| PATCH | /posts/:userId/:postId | Updates a post based on the userId and postId | 
| DELETE | /posts/:userId/:postId | Deletes a post based on the userId and postID | 

### Technologies Used 
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.

### Improvements
For my view templates, I can definitely work more on the styling and validation logic on the form. 
There might more route paths I haven't explored yet that optimizes this api. 