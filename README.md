# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technologies used
- React.js 19
- MUI 9
- Jest 
## Setup/install instructions
1. `npm install`
## Local run instructions
1. `npm run build`
2. `npm start`
## Mock user credentials & roles
Users have 3 critical attributes for establishing their credentials and role:
1. `email`: Serves as the username
2. `password`: Serves as authentication
3. `role`: Determines the user's role between 2 options (read/write)
All example mock user credentials details are found in `app/src/data/mockUserData.json`

## How to test the login/MFA flow

## Key design decisions and assumptions

### 1. MUI component library
I decided to use MUI as it has a very well documented component library of various componets
so I don't have to build from scratch. It also provides templates such as Sign In and Sign Up
which I utilized. It also themeing to quickly change the look and feel of the application. Finally
it adheres to WAI-ARIA 1.2 standard.
### 2. JSON Mock Data
Data from APIs are commonly found in JSON format. By ingesting the data via json files if a working API
were to be integrated into the application in the future it would be easy to integrate.
### 3. Utilities for reusablity
Instead of writing validation logic utils were implemented instead to be easilt reused throughout the application.
Things such as form validation, user access validation, etc.


## Known limitations

### 1. Using the MUI component library
Although MUI is widely available and accessible it may not fit all the necessary needs to enterprise use.
For example, a vulnerability mave be found in a MUI version that prohibits its user it the enterprise due
to security risk. In this case an alternative solution would be finding a component library tht adheres to
the security risk appetite or building a custom component library.
### 2. Window Testing
This was only tested on a 16:9 horizontal layout on Chrome. It is not fully tested in other browsers
and or devices.

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.