const express = require('express');
const router = express.Router(); // Create an instance of the Express Router

const studentController = require('../controllers/student_controller'); // Import the studentController module

// Define routes on the router

// GET route for '/addStudent' that maps to the studentController.addStudent function
router.get('/addStudent', studentController.addStudent);

// POST route for '/createStudent' that maps to the studentController.createStudent function
router.post('/createStudent', studentController.createStudent);

// POST route for '/editStudent' that maps to the studentController.updateStudent function
router.post('/editStudent', studentController.updateStudent);

// GET route for '/show-student-details/:id' that maps to the studentController.studentDetails function
router.get('/show-student-details/:id', studentController.studentDetails);

// GET route for '/edit-student-details/:id' that maps to the studentController.editStudentDetails function
router.get('/edit-student-details/:id', studentController.editStudentDetails);

module.exports = router; // Export the router module for use in other parts of the application
