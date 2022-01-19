# COYO Plug-in Tutorial

This project contains step-by-step source code for creating our first own COYO plug-in.

A written guide explaining all the steps can be found at the [COYO developer hub](https://dev.coyoapp.com/docs/tutorial-creating-your-first-plug-in-step-by-step).

Please be aware that this code should serve demonstration purposes only.
You will have to make your own security and hosting decisions to create a production-ready plug-in.

## Project structure

The first steps of this tutorial only require static content to be served. All code needed is to be found in 
`/public`

This project is set up to be hosted at Heroku. If you also want to use it for hosting and testing your plug-in application,
please refer to the [Heroku's deployment guide](https://devcenter.heroku.com/articles/deploying-nodejs).

For Heroku to serve static content we need to run a web application. For this demo we chose Node.js and Express.

On the `master branch` a basic Express project is set up to be deployable at Heroku. It does not serve any content yet though.

For following along the tutorial checkout the respective branch for the step.

```sh
git checkout 1-static
git checkout 1a-static-entrypoints
git checkout 2-frontend-data
git checkout 3-configuration
git checkout 3a-configuration
git checkout 3b-configuration
git checkout 4-lifecycle
git checkout 4a-lifecycle
git checkout 4b-lifecycle
git checkout 4c-lifecycle
```

## Prerequisites

To run the project locally you will need:
* Node.js (>=12.0) and npm installed.
* A postgres database set up.

To also deploy it to Heroku you will additionally need:
* a free [Heroku account](https://signup.heroku.com/signup/dc)
* the [Heroku CLI](https://cli.heroku.com/)
* follow along the [Getting Started on Heroku with Node.js guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database) to set up a postgres database at Heroku. 

## Developing the project locally

Checkout the step/branch you want to test.
Once run `npm install` to fetch all dependencies given in your `package.json`.

Run the `build` and `start` task using [`npm`](https://docs.npmjs.com/getting-started/what-is-npm).

```sh
npm run build;
npm run start;
```
All static files from the built `/dist` folder are now served at `http://localhost:5000`

## Deploying to Heroku

Once run `heroku login` and `heroku create` to make a personal Heroku project from it.

Commit any changes that you did.

Run `git push heroku <your-branch>:master`.

Run `heroku open`.

Heroku builds the project and serves the `/dist` folder at your heroku instance,
e.g. https://coyo-plugins-getting-started.herokuapp.com/manifest.json 
