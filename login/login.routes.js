const expressRouter = require('express').Router();
const collections = require('../database/collections');

expressRouter.get('/', (req, res, next) => res.render('login', {
    loginError: false,
    loginAgain: false, 
}));
expressRouter.post('/', (req, res, next) => {
    global.db.collection(collections.users)
            .findOne({
                'username': req.body.username,
                'password': req.body.password
            })
            .then(users => {
                console.log(users);
                if(Array.isArray(users) && users.length) {
                    res.redirect('/');
                } else throw new Error();
            })
            .catch(() => res.render('login', {
                loginError: true,
                loginAgain: false, 
            }));
});

module.exports = expressRouter;