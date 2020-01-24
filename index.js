// nodejs imports
const http = require('http');
const path = require('path');

// library imports
const express = require('express');
const bodyParser = require('body-parser');

// app files import
const connectMongodb = require('./database/connect');
const loginRoutes = require('./login/login.routes');

const app = express();
const PORT = 80;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
app.set('views', 'views');

// global middleware
app.use('/', (req, res, next) => next());

// middleware for all rest API's
app.use('/api', (req, res, next) => next());

app.use('/login', loginRoutes);

// error handler
app.use((req, res, next) => res.status(404).send('Page not found <a href="/">Go Home</a>'));

connectMongodb(client => {
    console.log('database connected ', client);
    global.db = client.db();
    http.createServer(app).listen(PORT, () =>
        console.log(`See the magic on port number ${PORT}`));
});
