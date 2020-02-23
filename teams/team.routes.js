const expressRouter = require('express').Router();
const collections = require('../database/collections');

expressRouter.get('/', (req, res, next) => res.render('allTeams'));

expressRouter.get('/add', (req, res, next) =>
    res.render('addTeam'));

expressRouter.post('/add', (req, res, next) =>
    res.redirect(`/teams/${req.body.teamName}`));

expressRouter.get('/:team', (req, res, next) =>
    res.render('team', { 
        team: {
            teamName: req.params.team,
            shortName: 'team'
        }
    }));

module.exports = expressRouter;
