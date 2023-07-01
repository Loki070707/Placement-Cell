const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 9000;

const expressLayouts = require('express-ejs-layouts');

// Used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require("express-session");

const db = require('./config/mongoose');
const path = require('path')

// Parse URL-encoded data
app.use(express.urlencoded());

app.use(cookieParser());

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayouts);
app.use(express.static('./assets'));

// Use Express routers
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session management
app.use(
  session({
    name: "authentication", // Name of the session cookie
    secret: 'blahsmmm', // Secret used to sign the session ID cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Cookie expiration time (in milliseconds)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to set the authenticated user in the request object
app.use(passport.setAuthenticatedUser);

// Start the server and listen on the specified port
app.listen(port, function (err) {
    if (err) {
      console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
