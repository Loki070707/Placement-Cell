const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://rajh3282:ENrJW83drfPEdu9f@placement-cell.iea9nky.mongodb.net/Placement-cell?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log("Connected to Database :: MongoDB")
});

module.exports = db;