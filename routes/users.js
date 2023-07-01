const express = require('express');
const passport = require('passport');

const { downloadCSV } = require('../controllers/csv_controller');
const router = express.Router(); // Create an instance of the Express Router

const usersController = require('../controllers/users_cantroller'); // Import the usersController module

// Define routes on the router

// GET route for '/profile' that maps to the usersController.profile function
router.get('/profile', usersController.profile);

// GET route for '/sign-up' that maps to the usersController.signUp function
router.get("/sign-up", usersController.signUp);

// GET route for '/sign-in' that maps to the usersController.signIn function
router.get("/sign-in", usersController.signIn);

// POST route for '/create' that maps to the usersController.create function
router.post('/create', usersController.create);

// POST route for '/create-session' that maps to the usersController.createSession function
router.post('/create-session', usersController.createSession);

// GET route for '/sign-out' that maps to the usersController.signOut function
router.get('/sign-out', usersController.signOut);

// GET route for '/reset-password' that maps to the usersController.resetPassword function
router.get('/reset-password', usersController.resetPassword);

// POST route for '/user-reset-password' that authenticates with Passport.js and maps to the usersController.resetUserPassword function
router.post('/user-reset-password', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), usersController.resetUserPassword);

// GET route for '/csv/downloadcsv' that maps to the downloadCSV function
router.get('/csv/downloadcsv', downloadCSV);

module.exports = router; // Export the router module for use in other parts of the application
