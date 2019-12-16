const path = require('path');
const expressRouter = require('express').Router();

expressRouter.get('/', (req, res, next) => res.render('login', {
    loginError: false,
    loginAgain: false, 
}));
expressRouter.post('/', (req, res, next) => {
    
    console.log(req.body);
    res.redirect('/');
});

module.exports = expressRouter;