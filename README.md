# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technologies used
- React.js 19
- MUI 9
- Jest 7
- Eslint 9
## Setup/install instructions
Run `npm install` to install necessary packages. Or `npm ci`.
## Local run instructions
1. `npm run build`
2. `npm start`
3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
## Mock user credentials & roles
Users have 3 critical attributes for establishing their credentials and role:
1. `email`: Serves as the username
2. `password`: Serves as authentication
3. `role`: Determines the user's role between 2 options (read/write)

### User with read access
Username: `johndoe@company.com`

Password: `password111`

MFA Code: `123456`

### User with write access
Username: `janesmith@company.com`

Password: `password222`

MFA Code: `123456`

*All example mock user credentials details are found in `app/src/data/mockUserData.json`

## How to test the login/MFA flow
### Testing the login flow
1. Navigate to the login screen (on initial load)
2. In the email field enter `janesmith@company.com`
3. In the password field enter `pass`
    
    *Note the invalid password format eror on the screen
5. In the password field enter `password`
    
    *Note the incorrect password error on the screen
7. In the password field enter `password222`
8. You have successfuly logged in! You should be redirected to the MFA screen.

### Testing the MFA flow
1. Upon successful login, in the MFA field enter `123`

    *Note the invalid MFA format error on the screen
2. In the MFA field enter `123455`

    *Note the incorrect MFA error on the screen
3. In the MFA field enter `123456`
4. You have successfuly passed the MFA check! You should be redirected to the dashboard screen.

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
Instead of writing validation logic for each component utils were implemented instead to be easily reused throughout the application.
Things such as form validation, user access validation, etc.


## Known limitations

### 1. Using the MUI component library
Although MUI is widely available and accessible it may not fit all the necessary needs for enterprise use.
For example, a vulnerability mave be found in a MUI version that prohibits its use in the enterprise due
to security risk. In this case an alternative solution would be finding a component library tht adheres to
the security risk appetite or building an internal custom component library.
### 2. Window Testing
This was only tested on a 16:9 horizontal layout on Chrome. It is not fully tested in other browsers
and or devices.
### 3. Unit Testing
Testing was focused on the core functionality of the application which is limited to
- Handling field validation errors for the Login & MFA pages
- Displaying the correct read & write views for the Dashboard page
- Redirecting to 404 screen if an error is caught in the application

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