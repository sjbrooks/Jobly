![Jobly-Component-Hierarchy](./Jobly-Component-Hierarchy.png?raw=true "Jobly-Component-Hierarchy")


# Jobly

Fullstack Javascript job searching and connecting app built with a React frontend, PostgreSQL database, and Express backend I built during my boot camp at Rithm School.

App allows users to sign up or login, browse and apply for posted jobs and search them by position, browse and search hiring companies by name, and view the jobs posted by each company. It also allows users to edit their profile info. Finally, the authentication and authorization middleware protects certain routes so that only the right logged in users can view certain pages.

This repository contains two separate applications: `client`, which is a Create React App (deployed with Surge) for the frontend, and `server`, a Node API (deployed on Heroku) for the backend.


# Getting Started on the Server

1. Clone the repository
2. `cd server`
3. `npm install`
4. `createdb jobly`
4. `createdb jobly-test`
5. `psql jobly < data.sql`
6. `npm start`
7. `npm test` to run the tests

# Getting Started on the Client

1. `cd ../client`
2. `npm install`
3. `npm start`
4. `npm test` to run the tests


## Built With

* [React](https://reactjs.org/) - Frontend Javascript framework used to build components
* [Express](https://expressjs.com/) - Backend Javascript Web App framework used for routing, authentication, and authorization
* [jsonwebtoken](https://jwt.io/) - Used in authentication and authorization to manage the current user in a tamper-evident way


## Authors

* My pair for client side was @mxjung
* My pair for server side was @JayRVigilla


## Acknowledgments

* Although I wrote a version of the [backend](https://github.com/sjbrooks/Express-Jobly) separately, the [deployed version of this app](http://jobly.demo.sjbrooks.com) uses the backend written by Rithm School (this was so that each pair could start with the same codebase when building out the React frontend)
