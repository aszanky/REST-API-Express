import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import config from './config';
import routes from './routes';

const LocalStrategy = require('passport-local').Strategy;

let app = express();
app.server = http.createServer(app);

// middleware
// parse application/json
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

// passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
    usernameField: 'email',
    passportField: 'password'
},
    Account.authenticate()
));
// serializeUser determines, which data of the user object should be stored in the session.
/* passport.deserializeUser is invoked on every request by passport.session.
It enables us to load additional user information on every request. 
This user object is attached to the request as req.user making it accessible in our request handling. */
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// api routes v1
app.use('/v1', routes);

app.server.listen(config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;