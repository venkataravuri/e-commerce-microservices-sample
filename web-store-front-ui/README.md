# Web Store Front UI
A web front end for e-commerce application. Built using React, MUI.

## Prerequisites
- Node > 18
- Git

## Install Dependencies
Install required node modules.

`npm install`

### Run App Locally
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run Tests
`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Production Build
 `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Build Docker Image & Push to Repository
If you are using minikube without 'Docker for Windows/MacOS',

`& minikube -p minikube docker-env --shell powershell | Invoke-Expression`

`docker build -t web-store-front-ui:latest .`
