# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Link to Demo Video
[MFA Demo](https://www.youtube.com/watch?v=WU3dYqDGhZI)

## Technologies used
- React.js 19
- MUI 9
- Jest 7
- ESLint 9

## Setup / Install
Run `npm install` to install dependencies, or `npm ci` for a clean install.

## Local run
1. `npm run build`
2. `npm start`
3. Open http://localhost:3000 in your browser.

## Mock user credentials & roles
Each mock user includes three attributes:

- `email`: the username
- `password`: the authentication secret
- `role`: either `read` or `write`

### User with read access
- Username: `johndoe@company.com`
- Password: `password111`
- MFA Code: `123456`

### User with write access
- Username: `janesmith@company.com`
- Password: `password222`
- MFA Code: `123456`

All mock user data is in `app/src/data/mockUserData.json`.

## How to test the login and MFA flows

### Login flow
1. Open the app — the Login screen appears by default.
2. Enter `janesmith@company.com` in the email field.
3. Enter `pass` in the password field — observe the invalid password format error.
4. Enter `password` — observe the incorrect password error.
5. Enter `password222` — you should be successfully authenticated and redirected to the MFA screen.

### MFA flow
1. On the MFA screen, enter `123` — observe the invalid MFA format error.
2. Enter `123455` — observe the incorrect MFA error.
3. Enter `123456` — you should pass the MFA check and be redirected to the Dashboard.

## Key design decisions and assumptions

### 1. MUI component library
I chose MUI because it provides a well-documented set of accessible components, ready-made templates (for example Sign In / Sign Up), and flexible theming. This speeds development and helps maintain accessibility (WAI-ARIA).

### 2. JSON mock data
Mocking API responses as JSON files mirrors common API formats and makes it straightforward to swap in a real API later.

### 3. Reusable utilities
Validation and user-access logic live in reusable utility modules so the same checks can be applied across multiple components.

## Known limitations

### 1. MUI compatibility
While MUI is convenient, certain enterprise constraints (or discovered vulnerabilities) could require replacing it with another library or a custom component set.

### 2. Window / browser testing
This app was primarily tested on a 16:9 Chrome desktop. Cross-browser and mobile testing is limited.

### 3. Unit testing coverage
Current tests focus on core behavior:
- field validation for Login & MFA pages
- correct read/write views on the Dashboard
- redirecting to the 404 page when errors occur

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