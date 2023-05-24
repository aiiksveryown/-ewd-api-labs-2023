# Assignment 2 - Web API.

Name: Ikechukwu Festus-Ihedioha

## Features.

 + Playlist - Users can add upcoming movies to their playlist. Api endpoints were added and linked to corresponding app feature.

 + Get Similar Movies:  Get a list of similar movies using a movie ID. 

 + Get Movie Recommendations - Get a list of recommended movies using a movie ID

 + Get Movie Images - Get the images for a movie using the movie ID

 + Get Movie Reviews - Get a list of movie reviews using the movie ID

 + Search user by email - API route for the search functionality

## Installation Requirements

### Run Locally

Clone the Repository

```cmd
git clone https://github.com/aiiksveryown/-ewd-api-labs-2023
```

Install dependencies

```bat
npm install
```

Start the development server

```bat
npm run serve
```

### Deploy the API to google cloud
Create a google cloud account and download the gcloud cli.

Login to google cloud and select appropriate project

```cmd
gcloud init
```

Deploy

```bat
npm run deploy
```

## API Configuration

[Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.]
[**REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB,** just placeholders as indicated below:]

```bat
CLOUDSDK_ACTIVE_CONFIG_NAME="Your Google cloud cli profile" # For Deploying to google cloud

NODE_ENV=serverless
PORT=8080
HOST=your_db_host_name
DATABASE_DIALECT=mongo
TMDB_KEY=Your_tmdb_api_key
DATABASE_URL=your_mongo_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```


## API Design

|  Endpoint  | GET | POST | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/accounts/security/token | N/A | Authenticates a user | N/A | N/A |
| /api/accounts/security/verify | N/A | Verifies a user's token | N/A | N/A |
| /api/accounts/ | Returns list of all users | Creates a new user | N/A | N/A |
| /api/accounts/{id} | Get a specific user | N/A | Update user information | N/A |
| /api/accounts/search | N/A | Find an account by email | N/A | N/A |
| /api/accounts/{id}/favourites | Returns list of user's favourite movies | Adds a movie to user's favourites | N/A | Removes a movie from user's favourites |
| /api/accounts/{id}/playlist | Returns user's movie playlist | Adds a movie to user's playlist | N/A | Removes a movie from user's playlist |
| /api/movies/{id} | Get a specific movie | N/A | N/A | N/A |
| /api/movies/ | Returns list of all movies | N/A | N/A | N/A |
| /api/movies/upcoming | Returns list of upcoming movies | N/A | N/A | N/A |
| /api/movies/{id}/recommendations | Returns list of movie recommendations | N/A | N/A | N/A |
| /api/movies/{id}/images | Returns list of images for a movie | N/A | N/A | N/A |
| /api/movies/{id}/reviews | Returns list of reviews for a movie | N/A | N/A | N/A |
| /api/genres/ | Returns list of all genres | N/A | N/A | N/A |
| /api/genres/{id} | Returns specific genre | N/A | N/A | N/A |

Swagger Documentation here: [Swagger](https://europe-west1-aiiksveryown.cloudfunctions.net/movies-api/api-docs/)


## Security and Authentication

This API uses JSON Web Tokens (JWTs) for user authentication.

Routes under `/api/accounts/security` are dedicated to handle authentication, where `/api/accounts/security/token` is used for logging in users and generating a JWT upon successful authentication, and `/api/accounts/security/verify` is used to verify a given token.

All other routes (excluding signup and login) require authentication and must be accessed with a valid bearer token provided in the headers of the request. Each token is user-specific and provides access only to data that is associated with the given user.

## Validation
The `ValidationController` implements validation checks on account creation, login, and search functionality. These checks ensure that the user data (like email, username, and password) meet certain criteria, such as appropriate string length and format, before they're processed by the application. 

Validation checks are also applied before a movie is added to a user's favorites or playlist, ensuring that the movie ID provided exists and is in the appropriate format.

All validation is handled through Joi. 


## Testing

The API was tested manually using both Postman and the Movies web application. No automation testing strategy or system was implemented

## Integrating with React App

The API has been integrated with the react app through a proxy defined in vite config. API requests are defined in src/api, like so:

~~~Javascript
export const getMovies = () => {
  return fetch(
    `/api/movies?language=en-US&include_adult=false&include_video=false&page=1`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }}
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

~~~

## Extra features

 + Mongodb Atlas - A remote db was setup on google cloud and is used by the app.

 + Serverless hosting - The api was deployed to google cloud functions and can be accessed from [endpoint](https://europe-west1-aiiksveryown.cloudfunctions.net/movies-api).

 + Auto-generated Swagger definitions - The definitions for the swagger documentation has been generated from joi schema. 


## Independent learning.

 + Serverless API Hosting - Researched hosting express and nodejs applications on serverless platforms

 + Generating swagger definitions from joi schema