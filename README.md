# React Blog by Nikolay Ognyanov

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `node server.js`

Runs the server to be used for data fetching.

## Description

This app is designed to resemble a web blog. The users are able to view, search, create, react to others' or edit/delete their own posts.

## Guests

The guests of the website are able to browse all the present posts, or to register and/or to login, in order to unlock the other features of the app.

### Home

Preview all available posts in chronological order.

### Details

Preview the selected post's title, author, description, likes and dislikes.

### Register and Login

In order for the guests to be able to successfully register and/or log in, they are required to fill in valid a email and a password, consisting of at least 5 characters.

## Users

The logged in users can also create new posts, which they can also edit or delete. The features "Search", "Profile", "Like" and "Dislike" are present as well.

### Search 

This algorithm attempts to match the user input with any of the available posts by their titles and/or authors.

### Create

The users are able to make new posts, containing title, description and an optional image link. If such is not provided, the app will add one randomly chosen from a previously selected list of natural views.

### Profile

Logged-in users are able to view their own or others' profiles. They include the individual created and liked posts, divided into two tabs.
