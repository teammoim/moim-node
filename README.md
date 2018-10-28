[![Build Status](https://travis-ci.org/teammoim/moim-node.svg?branch=master)](https://travis-ci.org/teammoim/moim-node)

# MOIM node server & client

node JS server-side & client-side framework repository

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install IDE or editor

# Getting started
- Download the repository

- Install dependencies
```
npm install
```
- Build and run the project
```
npm run build
npm start
```

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

# Deploying the app

### Build the app

- execute `npm run build` from a terminal window

## Project Structure

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.vscode**              | Contains VS Code specific settings                                                            |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/public**           | Static assets that will be used client side                                                   |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Seperate from source because there is a different build process.         |
| **views**                | Views define how your app renders on the client. In this case we're using pug                 |
| .travis.yml              | Used to configure Travis CI build                                                             |
| .copyStaticAssets.ts     | Build script that copies images, fonts, and JS libs to the dist folder                        |
| jest.config.js           | Used to configure Jest                                                                        |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tslint.json              | Config settings for TSLint code style checking                                                |

### Running the build

Below is a list of all the scripts this template has available:


| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `build`                   | Full build. Runs ALL build tasks (`build-sass`, `build-ts`, `tslint`, `copy-static-assets`)       |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `tslint`                  | Runs TSLint on project files                                                                       |



### Running tests
Simply run `npm run test`.
Note this will also generate a coverage report.

### Running TSLint
```
npm run build   // runs full build including TSLint
npm run tslint  // runs only TSLint
```

## Open source css framework

we are using Bulma and Material Design icons. 
if you want to use them, check out the site below

Bulma : https://bulma.io/

Material Design : https://www.w3schools.com/icons/google_icons_intro.asp

## License

This project is licensed under the GPL3 License - see the [LICENSE](LICENSE.md) file for details
