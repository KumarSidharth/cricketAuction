const expressRouter = require('express').Router();
const users = require('../database/users.schema');

expressRouter.get('/', (req, res, next) => res.render('login', {
    loginError: false,
    loginAgain: false,
}));
expressRouter.post('/', (req, res, next) => {
    users.count({
        username: req.body.username,
        password: req.body.password
    })
    .then(count => {
        console.log(count);
        if (count === 1) {
            res.redirect('/');
        } else {
            throw new Error();
        }
    })
    .catch(() => res.render('login', {
        loginError: true,
        loginAgain: false,
    }));
});

module.exports = expressRouter;
