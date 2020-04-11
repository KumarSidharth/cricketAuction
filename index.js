// nodejs imports
const http = require('http');
const path = require('path');

// library imports
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs").__express;

// app files import
const connectMongodb = require('./database/connect');
const loginRoutes = require('./login/login.routes');
const teamRoutes = require('./teams/team.routes');

const app = express();
const PORT = 80;

app.use(express.static('./public'));
app.use('/tmp', express.static('./tmp'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
app.engine('.ejs', ejs); // fixes webpack bundling issue
app.set('views', 'views'); // sets the path to all the ejs files

// global middleware
app.use('/', (req, res, next) => next());

// middleware for all REST API's
app.use('/api', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Todo: should be changed when in production
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/login', loginRoutes);

app.use('/teams', teamRoutes);

// error handler
app.use((req, res, next) => res.status(404).send('Page not found <a href="/">Go Home</a>'));

connectMongodb(client => {
    console.log('database connected ', client);
    http.createServer(app).listen(PORT, () =>
        console.log(`See the magic on port number ${PORT}`));
});
