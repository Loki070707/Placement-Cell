const express = require('express');
const passport = require('passport');

const router = express.Router(); // Create an instance of the Express Router
const homeController = require('../controllers/home_controller'); // Import the homeController module
const app = express(); // Create an instance of the Express application
console.log("router loaded");

// Define routes on the router

// GET route for the root URL ('/') that maps to the homeController.home function
router.get('/', homeController.home);

// Use the '/users' path and import and use the router module defined in './users'
router.use('/users', require('./users'));

// Use the '/student' path and import and use the router module defined in './students'
router.use('/student', require('./students'));

// Use the '/interview' path and import and use the router module defined in './interview'
router.use('/interview', require('./interview'));

app.use(passport.initialize()); // Register passport middleware for authentication
app.use(passport.session()); // Register passport middleware for session management

app.use(passport.setAuthenticatedUser); // Register a middleware function to set the authenticated user in the request object

module.exports = router; // Export the router module for use in other parts of the application
