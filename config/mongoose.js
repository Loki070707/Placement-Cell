const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://kashyaploki07:huupeag37HlAiDWT@cluster0.6r7qk6h.mongodb.net/Cluster0?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log("Connected to Database :: MongoDB")
});

module.exports = db;