const expressRouter = require('express').Router();
const Team = require('../database/teams.schema');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/avatar') {
            cb(null, true); // accept the image
    } else {
        cb(null, false); // reject the image
    }
}

expressRouter.get('/', (req, res, next) => {
    Team.findOne({
        $or: [
            {teamName: req.team},
            {shortName: req.team}
        ]
    }).then (team => {
        res.render('editLogo', {team});
    })
    
});

expressRouter.post('/', 
    multer({ storage, fileFilter }).single('teamlogo'),
    (req, res, next) => {
        Team.updateOne(
            {
            $or: [
                {teamName: req.team},
                {shortName: req.team}
            ]
        }, {logoUrl: req.file.path})
        .then(team => res.redirect(`/teams/${req.team}`));
});

module.exports = expressRouter;
