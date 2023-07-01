const express = require("express");
const router = express.Router(); // Create an instance of the Express Router

const interviewController = require('../controllers/interview_controller'); // Import the interviewController module

// Define routes on the router

// GET route for '/addInterview' that maps to the interviewController.addInterview function
router.get('/addInterview', interviewController.addInterview);

// POST route for '/createInterview' that maps to the interviewController.createInterview function
router.post('/createInterview', interviewController.createInterview);

// GET route for '/show-interview-details/:id' that maps to the interviewController.interviewDetails function
router.get('/show-interview-details/:id', interviewController.interviewDetails);

module.exports = router; // Export the router module for use in other parts of the application
