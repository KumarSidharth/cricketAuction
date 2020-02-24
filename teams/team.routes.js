const expressRouter = require('express').Router();
const Team = require('../database/teams.schema');

expressRouter.get('/', (req, res, next) => {
    Team.find()
        .then(teams => {
            if (!teams) {
                throw new Error();
            }
            res.render('allTeams', {teams});
        })
        .catch(err => res.send(err));
    
});

expressRouter.get('/add', (req, res, next) =>
    res.render('addTeam'));

expressRouter.post('/add', (req, res, next) => {
    new Team({
        teamName: req.body.teamName,
        logoUrl: req.body.logoUrl,
        shortName: req.body.shortName,
        homeGround: req.body.homeGround,
        links: {
            website: req.body.website,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            youtube: req.body.youtube,
        }
    })
        .save()
        .then(() => res.redirect(`/teams/${req.body.teamName}`))
        .catch((error) => {
            console.error(error);
            res.send('error');
        });
});

expressRouter.get('/:team', (req, res, next) => {
    Team.findOne({
        $or: [
            {teamName: req.params.team},
            {shortName: req.params.team}
        ]
    })
    .then(team => {
        console.log(team);
        if(!team) {
            throw new Error('team not found');
        }
        res.render('team', {team});
    })
    .catch(err => res.send('error Team not found'));
});

module.exports = expressRouter;
